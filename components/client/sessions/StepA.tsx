import { Input } from '@nextui-org/react';
import { FormikValues, useFormikContext } from 'formik';
import React from 'react';

export const StepA = () => {
  const { handleChange, values } = useFormikContext<FormikValues>();

  return (
    <div>
      <Input
        className="my-5"
        id="date"
        isRequired
        label="Session Date"
        onChange={handleChange}
        type="date"
        value={values.date} // Corrected value binding
      />
      <Input
        className="mb-5"
        id="duration"
        isRequired
        label="Duration"
        onChange={handleChange}
        type="number"
        value={values.duration} // Corrected value binding
      />
    </div>
  );
};
