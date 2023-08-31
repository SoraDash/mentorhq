import { faker } from '@faker-js/faker';
import { times, sample, random } from 'lodash';
import { CalendlyEvent } from './types';
import { prisma } from '@/lib/db/prisma';

type KindType = 'google' | 'zoom' | 'slack';

async function fetchStudentUUIDs(): Promise<string[]> {
  try {
    const students = await prisma.student.findMany({
      select: {
        id: true
      }
    });
    return students.map(student => student.id);
  } catch (error) {
    console.error('Error fetching student UUIDs:', error);
    throw error; // re-throw to ensure we stop execution if there's an issue
  }
}

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

export const generateCalendlyEvents = async (count: number): Promise<CalendlyEvent[]> => {
  let studentUUIDs: string[] = [];
  try {
    studentUUIDs = await fetchStudentUUIDs();
  } catch (error) {
    console.error('Error in generateCalendlyEvents:', error);
    return []; // return an empty array or handle this as appropriate
  }
  return times(count, (): CalendlyEvent => {
    const kind: KindType = faker.helpers.arrayElement(['google', 'zoom', 'slack']);

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
      student_name: faker.person.fullName(),
      student_email: faker.internet.email(),
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
      studentID: sample(studentUUIDs),
    };
  });
};

