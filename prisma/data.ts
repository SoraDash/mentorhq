const ppCourses = [
  { name: "HTML/CSS Essentials (PP1)", prefix: "pp1", order: 1 },
  { name: "JavaScript Essentials (PP2)", prefix: "pp2", order: 2 },
  { name: "Python Essentials (PP3)", prefix: "pp3", order: 3 },
  { name: "Full Stack Toolkit (PP4)", prefix: "pp4", order: 4 },
  { name: "eCommerce (PP5)", prefix: "pp5", order: 5 }
];
const msCourses = [
  { name: "User Centric Front End Development (MS1)", prefix: "ms1", order: 1 },
  { name: "Interactive Front End Development (MS2)", prefix: "ms2", order: 2 },
  { name: "Data Centric Development (MS3)", prefix: "ms3", order: 3 },
  { name: "Full Stack Frameworks with Django (MS4)", prefix: "ms4", order: 4 },
];

export const sessions = [
  { name: "Intro", order: 0, icon: "🤝" },
  { name: "Project inception", order: 1, icon: "📝" },
  { name: "Middle of project", order: 2, icon: "👨‍💻" },
  { name: "End of project", order: 3, icon: "💪 " },
  { name: "Interview preparation and career advice", order: 4, icon: "👔" },
  { name: "Postponed (Valid Reason)", order: 5, icon: "📅" },
  { name: "**No-show**", order: 6, icon: "🚫" },
  { name: "Other", order: 7, icon: "🤷" }
];

export const courses = [
  {
    courseCode: "disd",
    months: 12,
    projectCount: 4,
    prefix: "MS",
    projectStages: [...msCourses],
    hasSpecialization: false,
    name: "Diploma In Web Application Development",
    description: "The old 4 project course",
  },
  {
    courseCode: "diwad",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    hasSpecialization: false,
    projectStages: [...ppCourses],
    name: "Diploma In Software Development",
    description: "5 project course up to specialisations (PP1-PP4)",
  },
  {
    courseCode: "disdcc",
    months: 12,
    projectCount: 4,
    prefix: "PP",
    hasSpecialization: false,
    projectStages: [...ppCourses],
    name: "Diploma In Software Development Common Curriculum",
    description: "5 project course up to specialisations (PP1-PP4)",
  },
  {
    courseCode: "disde",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    hasSpecialization: false,
    projectStages: [...ppCourses],
    name: "Diploma In Software Development E-commerce (Default)",
    description:
      "E-commerce specialisation course assigned by default (PP1-PP5)",
  },
  {
    courseCode: "specomm",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    projectStages: [...ppCourses],
    hasSpecialization: true,
    name: "Diploma In Software Development E-commerce (Chosen)",
    description:
      "E-commerce specialisation course chosen by the student (PP1-PP5)",
  },
  {
    courseCode: "sppredan",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    hasSpecialization: true,
    projectStages: [...ppCourses],
    name: "Specialization in Predictive Analytics",
    description: "Predictive Analytics specialisation course (PP1-PP5)",
  },
  {
    courseCode: "spadvfe",
    months: 12,
    projectCount: 5,
    prefix: "PP",
    hasSpecialization: true,
    projectStages: [...ppCourses],
    name: "Specialization in Advanced Frontend",
    description: "Advanced Frontend specialisation course (PP1-PP5)",
  },
];
