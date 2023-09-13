import { courses } from './data';

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


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
        console.warn(`⚠️  Project template ${projectTemplateInfo.name} for course ${createdCourse.name} already exists. Skipping...`);
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
