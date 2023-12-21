import { FormikValues, useFormikContext } from 'formik';
import React from 'react';

import { FormikSelect } from '@/components/forms/FormikSelect';

const submissionOptions = [
  {
    value: 'First Time Submission',
    label: 'First Time Submission',
    emoji: '🆕',
  },
  {
    value: 'Project Resubmission',
    label: 'Project Resubmission',
    emoji: '🔄',
  },
];
const followUpOptions = [
  {
    value: 'Yes',
    label: 'Yes',
    emoji: '👎',
  },
  {
    value: 'No',
    label: 'No',
    emoji: '👍',
  },
];

export const StepD = () => {
  const { handleChange } = useFormikContext<FormikValues>();

  return (
    <div>
      <FormikSelect
        isRequired
        label="Select type of submission"
        name="submissionType"
        onChange={handleChange}
        options={submissionOptions}
      />
      <FormikSelect
        defaultValue={followUpOptions[1]}
        isRequired
        label="Do you want Student Care to follow up with the student?"
        name="follow_up"
        onChange={handleChange}
        options={followUpOptions}
      />
    </div>
  );
};
