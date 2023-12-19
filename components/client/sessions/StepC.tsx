import { Textarea } from "@nextui-org/react";
import { useFormikContext, FormikValues } from "formik";
import React from "react";

interface StepCProps {}

export const StepC: React.FC<StepCProps> = () => {
  const { values, handleChange } = useFormikContext<FormikValues>();

  return (
    <div>
      <Textarea
        isRequired
        maxRows={4}
        label="Summary"
        labelPlacement="outside"
        placeholder="Summary of the session"
      />
      <Textarea
        maxRows={4}
        label="Personal Notes"
        labelPlacement="outside"
        placeholder="Personal Notes (Not given to CI)"
      />
    </div>
  );
};
