import { PrismaClient } from '@prisma/client';

import { courses, sessions } from '../data';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  for (const courseInfo of courses) {
    const existingCourse = await prisma.course.findFirst({
      where: { courseCode: courseInfo.courseCode },
    });

    if (existingCourse) {
      console.warn(
        `⚠️ Course with code ${courseInfo.courseCode} already exists. Skipping...`,
      );
      continue;
    }

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

    let projectTemplates: any[] = []; // Adjust the type if you have a specific type for project templates.

    if (courseInfo.projectStages) {
      projectTemplates = [...projectTemplates, ...courseInfo.projectStages];
    }

    for (const projectTemplateInfo of projectTemplates) {
      const existingProjectTemplate = await prisma.projectTemplate.findFirst({
        where: {
          name: projectTemplateInfo.name,
          prefix: projectTemplateInfo.prefix,
          courseId: createdCourse.id,
        },
      });

      if (existingProjectTemplate) {
        console.warn(
          `⚠️ Project template ${projectTemplateInfo.name} for course ${createdCourse.name} already exists. Skipping...`,
        );
        continue;
      }

      await prisma.projectTemplate.create({
        data: {
          name: projectTemplateInfo.name,
          prefix: projectTemplateInfo.prefix,
          courseId: createdCourse.id,
          order: projectTemplateInfo.order,
        },
      });
      console.log(`🎉 Created project template ${projectTemplateInfo.name}.`);
    }

    console.log(
      `✅ Created course ${courseInfo.name} and its project templates.`,
    );
  }

  for (const session of sessions) {
    try {
      const existingSession = await prisma.sessionType.findFirst({
        where: { name: session.name },
      });

      if (existingSession) {
        console.warn(`⚠️ Session ${session.name} already exists. Skipping...`);
        continue;
      }

      await prisma.sessionType.create({
        data: {
          name: session.name,
          order: session.order,
          icon: session.icon,
        },
      });

      console.log(`✅ Created session ${session.name}.`);
    } catch (error: any) {
      console.error(
        `❌ Failed to seed session ${session.name}: ${error.message}`,
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(`❌ Error: ${e.message}`);
    throw e;
  })
  .finally(async () => {
    console.log('🔚 Seeding process finished. Disconnecting...');
    await prisma.$disconnect();
  });
