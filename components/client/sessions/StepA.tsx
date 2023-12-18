import { Input } from "@nextui-org/react";
import { FormikValues, useFormikContext } from "formik";
import React from "react";

interface StepAProps {}

export const StepA: React.FC<StepAProps> = () => {
  const { values, handleChange } = useFormikContext<FormikValues>();
  return (
    <div>
      <Input
        type="date"
        label="Session Date"
        id="date"
        isRequired
        className="my-5"
        value={values.date} // Corrected value binding
        onChange={handleChange}
      />
      <Input
        type="number"
        label="Duration"
        id="duration"
        isRequired
        className="mb-5"
        value={values.duration} // Corrected value binding
        onChange={handleChange}
      />
    </div>
  );
};
