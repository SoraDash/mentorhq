
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ppCourses = [
  { name: "HTML/CSS Essentials (PP1)", prefix: "pp1" },
  { name: "JavaScript Essentials (PP2)", prefix: "pp2" },
  { name: "Python Essentials (PP3)", prefix: "pp3" },
  { name: "Full Stack Toolkit (PP4)", prefix: "pp4" },
];
const msCourses = [
  { name: "User Centric Front End Development (MS1)", prefix: "ms1" },
  { name: "Interactive Front End Development (MS2)", prefix: "ms2" },
  { name: "Data Centric Development (MS3)", prefix: "ms3" },
  { name: "Full Stack Frameworks with Django (MS4)", prefix: "ms4" },
];

const courses = [
  {
    courseCode: "diwad",
    months: 12,
    projectCount: 4,
    prefix: "MS",
    projectStages: [...msCourses],
    hasSpecialization: false,
    name: "Diploma In Web Application Development",
    description: "The old 4 project course",
  },
  {
    courseCode: "disd",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    projectStages: [...ppCourses],
    name: "Diploma In Software Development",
    description: "5 project course up to specialisations (PP1-PP4)",
  },
  {
    courseCode: "disdcc",
    months: 12,
    projectCount: 4,
    prefix: "PP",
    projectStages: [...ppCourses],
    name: "Diploma In Software Development Common Curriculum",
    description: "5 project course up to specialisations (PP1-PP4)",
  },
  {
    courseCode: "disde",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    projectStages: [...ppCourses],
    specialization: [{ name: "eCommerce (PP5)", prefix: "pp5" }],
    name: "Diploma In Software Development E-commerce (Default)",
    description:
      "E-commerce specialisation course assigned by default (PP1-PP5)",
  },
  {
    courseCode: "specomm",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    hasSpecialization: true,
    specialization: [{ name: "eCommerce (PP5)", prefix: "pp5" }],
    name: "Diploma In Software Development E-commerce (Chosen)",
    description:
      "E-commerce specialisation course chosen by the student (PP1-PP5)",
  },
  {
    courseCode: "sppredan",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    projectStages: [...ppCourses],
    name: "Specialization in Predictive Analytics",
    description: "Predictive Analytics specialisation course (PP1-PP5)",
  },
  {
    courseCode: "spadvfe",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    projectStages: [...ppCourses],
    name: "Specialization in Advanced Frontend",
    description: "Advanced Frontend specialisation course (PP1-PP5)",
  },
];

async function main() {
  for (const courseInfo of courses) {
    // Check if the course already exists
    const existingCourse = await prisma.course.findFirst({
      where: { courseCode: courseInfo.courseCode }
    });

    if (existingCourse) {
      console.warn(`⚠️ Course with code ${courseInfo.courseCode} already exists. Skipping...`);
      continue;
    }

    // 1. Create Course
    const createdCourse = await prisma.course.create({
      data: {
        courseCode: courseInfo.courseCode,
        months: courseInfo.months,
        projectCount: courseInfo.projectCount,
        prefix: courseInfo.prefix,
        hasSpecialization: courseInfo.hasSpecialization || false,
        name: courseInfo.name,
        description: courseInfo.description,
      },
    });

    // 2. Create associated ProjectTemplates for this course
    type ProjectTemplateInput = { name: string; prefix: string; };
    let projectTemplates: ProjectTemplateInput[] = [];

    if (courseInfo.projectStages) {
      projectTemplates = [...projectTemplates, ...courseInfo.projectStages];
    }

    if (courseInfo.specialization) {
      projectTemplates = [...projectTemplates, ...courseInfo.specialization];
    }

    for (const projectTemplateInfo of projectTemplates) {
      // Check if the project template already exists
      const existingProjectTemplate = await prisma.projectTemplate.findFirst({
        where: {
          name: projectTemplateInfo.name,
          prefix: projectTemplateInfo.prefix,
          courseId: createdCourse.id
        }
      });

      if (existingProjectTemplate) {
        console.warn(`⚠️ Project template ${projectTemplateInfo.name} for course ${createdCourse.name} already exists. Skipping...`);
        continue;
      }

      await prisma.projectTemplate.create({
        data: {
          name: projectTemplateInfo.name,
          prefix: projectTemplateInfo.prefix,
          courseId: createdCourse.id,
        },
      });
    }

    console.log(`✅ Created course ${courseInfo.name} and its project templates.`);
  }
}


main()
  .catch((e) => {
    console.error(`❌ Error: ${e.message}`);
    throw e;
  })
  .finally(async () => {
    console.log("🔚 Seeding process finished. Disconnecting...");
    await prisma.$disconnect();
  });
