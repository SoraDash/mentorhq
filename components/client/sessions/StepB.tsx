import { FormikSelect } from "@/components/forms/FormikSelect";
import { Project, SessionType } from "@prisma/client";
import { FormikValues, useFormikContext } from "formik";
import React from "react";

interface StepBProps {
  sortedSessions: SessionType[];
  projects?: Project[];
}

const progressOptions = [
  {
    label: "Poor",
    value: "POOR",
    emoji: "👎",
  },
  {
    label: "Average",
    value: "AVERAGE",
    emoji: "👍",
  },
  {
    label: "Excellent",
    value: "EXCELLENT",
    emoji: "🙌",
  },
];

export const StepB: React.FC<StepBProps> = ({ sortedSessions, projects }) => {
  const { values, handleChange, setFieldValue } =
    useFormikContext<FormikValues>();

  if (!values.progress) {
    setFieldValue("progress", progressOptions[1]);
  }
  const sessionOptions = sortedSessions.map((session) => ({
    value: session.id, // Correct: Use ID as the value for selection
    label: session.name,
    emoji: session.icon,
  }));

  const projectOptions = (projects || []).map((project) => ({
    value: project.id, // Correct: Use ID as the value for selection
    label: project.name,
    emoji: project.prefix.toUpperCase(),
  }));

  return (
    <div>
      <FormikSelect
        options={sessionOptions} // Directly use sessionOptions without remapping
        label="Session Type"
        name="session"
        placeholder="Select Session Type"
      />
      <FormikSelect
        options={projectOptions} // Directly use projectOptions without remapping
        label="Project"
        name="project"
        placeholder="Select Project"
      />

      <FormikSelect
        options={progressOptions}
        label="Progress"
        name="progress"
        placeholder="Select Progress"
      />
    </div>
  );
};
