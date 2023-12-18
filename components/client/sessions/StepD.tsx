import { Select, SelectItem } from "@nextui-org/react";
import { useFormikContext, FormikValues } from "formik";
import React from "react";

interface StepDProps {}

const submissionOptions = [
  {
    value: "First Time Submission",
  },
  {
    value: "Project Resubmission",
  },
];
const followUpOptions = [
  {
    value: "Yes",
  },
  {
    value: "No",
  },
];

export const StepD: React.FC<StepDProps> = () => {
  const { values, handleChange } = useFormikContext<FormikValues>();
  return (
    <div>
      <Select
        label="Was this for a first time project submission or a project re-submission?"
        placeholder="Select type of submission"
        isRequired>
        {submissionOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        label="Do you want Student Care to follow up with the student?"
        placeholder="Is a follow up required">
        {followUpOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
