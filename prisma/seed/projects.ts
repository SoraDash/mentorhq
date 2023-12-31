import { faker } from '@faker-js/faker';
import { PrismaClient, SessionProgress } from '@prisma/client';
import _ from 'lodash';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const firstUser = await prisma.user.findFirst();

  if (!firstUser) {
    console.error('❌ No users found in the database.');

    return;
  }

  // Fetch students and randomly pick 5
  const students = await prisma.student.findMany();
  const selectedStudents = _.sampleSize(students, 5);
  const sessionTypes = await prisma.sessionType.findMany({});
  const sessionTypeNames = sessionTypes.map((type) => type.name);

  for (const student of selectedStudents) {
    // Fetch projects for the current student
    const studentProjects = await prisma.project.findMany({
      where: { studentId: student.id },
    });
    const projectIds = studentProjects.map((project) => project.id);

    const numberOfSessions = _.random(3, 10); // Generate a random number of sessions for each student

    for (let i = 0; i < numberOfSessions; i++) {
      const sessionData = {
        date: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
        type: _.sample(sessionTypeNames),
        progress: _.sample(['POOR', 'AVERAGE', 'EXCELLENT']) as SessionProgress,
        summary: faker.lorem.sentence(),
        follow_up: _.sample(['Yes', 'No']),
        submissionType: _.sample([
          'First Time Submission',
          'Project Resubmission',
        ]),
        notes: faker.lorem.paragraph(),
        duration: faker.number.int({ min: 30, max: 120 }),
        session_url: faker.internet.url(),
        studentId: student.id,
        projectId: _.sample(projectIds),
        userId: firstUser.id,
      };

      try {
        await prisma.studentSession.create({
          data: sessionData,
        });

        console.log(
          `✅ Created session for student ${student.name} (project ID ${sessionData.projectId}.`,
        );
      } catch (error: any) {
        console.error(`❌ Failed to seed student session: ${error.message}`);
      }
    }

    console.log(
      `🔚 Completed seeding sessions for student ${student.name} (ID: ${student.id}).`,
    );
  }
}

main()
  .catch((e) => {
    console.error(`❌ Error: ${e.message}`);
    throw e;
  })
  .finally(async () => {
    console.log('🔚 Overall seeding process finished. Disconnecting...');
    await prisma.$disconnect();
  });
