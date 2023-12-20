import { FormikValues, useFormikContext } from "formik";
import React from "react";

interface StepFinalProps {}

export const StepFinal: React.FC<StepFinalProps> = () => {
  const { values } = useFormikContext<FormikValues>();
  return (
    <div>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};
