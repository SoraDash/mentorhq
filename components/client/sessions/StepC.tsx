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
        name="summary"
        maxRows={4}
        label="Summary"
        labelPlacement="outside"
        placeholder="Summary of the session"
        value={values.summary}
        onChange={handleChange}
      />
      <Textarea
        name="personalNotes"
        maxRows={4}
        label="Personal Notes"
        labelPlacement="outside"
        placeholder="Personal Notes (Not given to CI)"
        defaultValue={values.personalNotes}
        value={values.personalNotes}
        onChange={handleChange}
      />
    </div>
  );
};
