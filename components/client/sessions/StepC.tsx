import { Textarea } from '@nextui-org/react';
import { FormikValues, useFormikContext } from 'formik';
import React from 'react';

interface StepCProps {}

export const StepC: React.FC<StepCProps> = () => {
  const { handleChange, values } = useFormikContext<FormikValues>();

  return (
    <div>
      <Textarea
        isRequired
        label="Summary"
        labelPlacement="outside"
        maxRows={4}
        name="summary"
        onChange={handleChange}
        placeholder="Summary of the session"
        value={values.summary}
      />
      <Textarea
        defaultValue={values.personalNotes}
        label="Personal Notes"
        labelPlacement="outside"
        maxRows={4}
        name="personalNotes"
        onChange={handleChange}
        placeholder="Personal Notes (Not given to CI)"
        value={values.personalNotes}
      />
    </div>
  );
};
