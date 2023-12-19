import { FormikSelect } from "@/components/FormikSelect";
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
        isRequired
      />
      <FormikSelect
        name="follow_up"
        label="Do you want Student Care to follow up with the student?"
        options={followUpOptions}
        placeholder="Is a follow up required"
        isRequired
      />
      {/* <Select
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
      </Select> */}
      {/* <Select
        isRequired
        label="Do you want Student Care to follow up with the student?"
        placeholder="Is a follow up required">
        {followUpOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            onChange={handleChange}>
            {option.value}
          </SelectItem>
        ))}
      </Select> */}
    </div>
  );
};
