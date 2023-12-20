import { FormikSelect } from "@/components/forms/FormikSelect";
import { FormikValues, useFormikContext } from "formik";
import React from "react";

interface StepDProps {}

const submissionOptions = [
  {
    value: "First Time Submission",
    label: "First Time Submission",
    emoji: "🆕",
  },
  {
    value: "Project Resubmission",
    label: "Project Resubmission",
    emoji: "🔄",
  },
];
const followUpOptions = [
  {
    value: "Yes",
    label: "Yes",
    emoji: "👎",
  },
  {
    value: "No",
    label: "No",
    emoji: "👍",
  },
];

export const StepD: React.FC<StepDProps> = () => {
  const { values, handleChange } = useFormikContext<FormikValues>();
  return (
    <div>
      <FormikSelect
        name="submissionType"
        label="Select type of submission"
        options={submissionOptions}
        onChange={handleChange}
        isRequired
      />
      <FormikSelect
        name="follow_up"
        label="Do you want Student Care to follow up with the student?"
        options={followUpOptions}
        onChange={handleChange}
        isRequired
      />
    </div>
  );
};
