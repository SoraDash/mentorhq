import { prisma } from '@/lib/db/prisma';
import { faker } from '@faker-js/faker';
import { Student } from '@prisma/client';
import { random, sample, times } from 'lodash';
import { CalendlyEvent } from './types';

type KindType = 'google' | 'zoom' | 'slack';

const config = {
  baseURLs: {
    calendly: 'https://api.calendly.com',
    events: 'https://calendly.com/events',
    cancellations: 'https://calendly.com/cancellations',
    reschedulings: 'https://calendly.com/reschedulings',
  },
  eventNames: [
    'Milestone Project Inception',
    'Milestone Project Midpoint',
    'Milestone Project Review',
  ],
};

async function getAllStudents(): Promise<Student[]> {
  try {
    const students = await prisma.student.findMany({
    });
    return students;
  } catch (error) {
    console.error('Error fetching students from the database:', error);
    return [];
  }
}

export const generateCalendlyEvents = async (count: number): Promise<CalendlyEvent[]> => {
  let studentUUIDs: string[] = [];
  let realStudents: Student[] = [];

  try {
    realStudents = await getAllStudents();
    studentUUIDs = realStudents.map(student => student.id);
  } catch (error) {
    studentUUIDs = times(10, () => faker.string.uuid());
    console.error('Error in generateCalendlyEvents:', error);
  }

  return times(count, (): CalendlyEvent => {
    const kind: KindType = faker.helpers.arrayElement(['google', 'zoom', 'slack']);

    const isRealStudentAvailable = realStudents.length > 0;

    return {
      calendar_event: {
        external_id: faker.string.uuid(),
        kind: kind,
      },
      created_at: faker.date.recent().toISOString(),
      end_time: faker.date.future().toISOString(),
      event_guests: [],
      event_memberships: [
        {
          user: `${config.baseURLs.calendly}/users/${faker.string.uuid()}`,
        },
      ],
      event_type: `${config.baseURLs.calendly}/event_types/${faker.string.uuid()}`,
      invitees_counter: {
        active: 1,
        limit: 1,
        total: 1,
      },
      location: {
        join_url: kind === 'google'
          ? `${config.baseURLs.events}/${faker.string.uuid()}/google_meet`
          : `${config.baseURLs.events}/${faker.string.uuid()}`,
        status: 'pushed',
        type: `${kind}_conference`,
      },
      name: sample(config.eventNames) || '',
      start_time: faker.date.recent().toISOString(),
      status: 'active',
      updated_at: faker.date.recent().toISOString(),
      uri: `${config.baseURLs.events}/${faker.string.uuid()}`,
      student_name: isRealStudentAvailable
        ? sample(realStudents)?.name || '' // Use a random real student name or empty string
        : `${faker.person.fullName()} (fake)`, // Use a fake student name
      student_email: isRealStudentAvailable
        ? sample(realStudents)?.email || '' // Use a random real student email or empty string
        : faker.internet.email(), // Use a fake student email
      cancel_url: `${config.baseURLs.cancellations}/${faker.string.uuid()}`,
      reschedule_url: `${config.baseURLs.reschedulings}/${faker.string.uuid()}`,
      questions: [
        {
          answer: faker.helpers.arrayElement(['Yes', 'No']),
          position: 0,
          question: 'Is this a brainstorm session?',
        },
        {
          answer: `Milestone ${random(1, 5)} / Portfolio ${faker.number.int(10)}`,
          position: 1,
          question: 'What project is this?',
        },
      ],
      studentID: isRealStudentAvailable
        ? sample(realStudents)?.id ?? '' // Use a random real student ID or empty string
        : sample(studentUUIDs) ?? faker.string.uuid(), // Use either a random fake or real student ID
    };
  });
};
