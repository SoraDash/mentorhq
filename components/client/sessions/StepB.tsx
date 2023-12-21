import { Project, SessionType } from '@prisma/client';
import { FormikValues, useFormikContext } from 'formik';
import React from 'react';

import { FormikSelect } from '@/components/forms/FormikSelect';

interface StepBProps {
  projects?: Project[];
  sortedSessions: SessionType[];
}

const progressOptions = [
  {
    label: 'Poor',
    value: 'POOR',
    emoji: '👎',
  },
  {
    label: 'Average',
    value: 'AVERAGE',
    emoji: '👍',
  },
  {
    label: 'Excellent',
    value: 'EXCELLENT',
    emoji: '🙌',
  },
];

export const StepB: React.FC<StepBProps> = ({ projects, sortedSessions }) => {
  const { handleChange, setFieldValue, values } =
    useFormikContext<FormikValues>();

  if (!values.progress) {
    setFieldValue('progress', progressOptions[1]);
  }

  const sessionOptions = sortedSessions.map((session) => ({
    value: session.id, // Correct: Use ID as the value for selection
    label: session.name,
    emoji: session.icon,
  }));

  const projectOptions = (projects || []).map((project) => ({
    value: project.id, // Correct: Use ID as the value for selection
    label: project.name,
    emoji: project.prefix.toUpperCase(),
  }));

  return (
    <div>
      <FormikSelect
        label="Session Type"
        name="session"
        options={sessionOptions} // Directly use sessionOptions without remapping
        placeholder="Select Session Type"
      />
      <FormikSelect
        label="Project"
        name="project"
        options={projectOptions} // Directly use projectOptions without remapping
        placeholder="Select Project"
      />

      <FormikSelect
        defaultValue={progressOptions[1]}
        label="Progress"
        name="progress"
        options={progressOptions}
        placeholder="Select Progress"
      />
    </div>
  );
};
