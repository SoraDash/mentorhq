'use server';

import { FormikValues } from 'formik';

import { getAuthSession } from './auth/auth';

interface FeedbackURL {
  studentEmail: string;
  values: FormikValues;
}

export const convertDuration = (minutesStr: string) => {
  const minutes = parseInt(minutesStr, 10);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const seconds = 0; // Assuming no seconds part is needed

  // Zero-padding the hours and minutes if they are less than 10
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = mins.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

export const generateFeedbackURL = async ({
  studentEmail,
  values,
}: FeedbackURL) => {
  const mentor = await getAuthSession();
  const mentorEmail = mentor?.user?.email;
  const createEntry = (entry: string, value: string | boolean) =>
    `&${entry}=${encodeURIComponent(value)}`;

  console.log('Form Values:', values); // Debugging

  const duration = convertDuration(values.duration);
  const progressTexts: { [key: string]: string } = {
    excellent: "Excellent - It's going great.",
    average: 'Average - The student is moving at an acceptable pace.',
    poor: "I'm worried about this student's progress.",
  };

  const progress =
    progressTexts[values.progress.value.toLowerCase()] || values.progress.value;

  const urlParams = [
    createEntry('emailAddress', mentorEmail as string),
    createEntry('entry.1191000917', values.date),
    createEntry('entry.1269347964', studentEmail),
    createEntry('entry.1521715512', values.session.label),
    createEntry('entry.478142644', values.project.label),
    createEntry('entry.1121396892', values.submissionType.value),
    createEntry('entry.775489883', duration),
    createEntry('entry.2010663110', progress),
    createEntry('entry.1882714143', values.summary),
    createEntry('entry.1360996801', values.follow_up.value),
    createEntry('emailReceipt', true),
  ];

  const completedURL = `${
    process.env.NEXT_PUBLIC_CI_FEEDBACK_URL
  }?${urlParams.join('')}`;

  console.log('Generated URL:', completedURL);

  return completedURL;
};
