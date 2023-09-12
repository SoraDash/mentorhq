import { FormikValues, useFormikContext } from 'formik';
import React from 'react';

interface StepAProps { }

export const StepA: React.FC<StepAProps> = () => {
  const { values, handleChange, handleBlur } = useFormikContext<FormikValues>();
  return (
    <div>
      <input
        name="sessionDate"
        value={ values.sessionDate }
        onChange={ handleChange }
        onBlur={ handleBlur }
      />
    </div>
  );
}