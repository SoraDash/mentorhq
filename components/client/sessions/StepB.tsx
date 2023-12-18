import { FormikSelect } from "@/components/FormikSelect";
import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { Project, SessionType } from "@prisma/client";
import { FormikValues, useFormikContext } from "formik";
import React from "react";

interface StepBProps {
  sortedSessions: SessionType[];
  projects?: Project[];
}

const progressOptions = [
  {
    text: "Poor",
    value: "POOR",
    emoji: "👎",
  },
  {
    text: "Average",
    value: "AVERAGE",
    emoji: "👍",
  },
  {
    text: "Excellent",
    value: "EXCELLENT",
    emoji: "🙌",
  },
];

export const StepB: React.FC<StepBProps> = ({ sortedSessions, projects }) => {
  const { values, handleChange } = useFormikContext<FormikValues>();
  const sessionOptions = sortedSessions.map((session) => ({
    value: session.id, // Using 'id' as the unique identifier
    label: session.name,
    sessionType: {
      id: session.id,
      name: session.name,
      icon: session.icon,
    },
  }));

  // Transform Project data for FormikSelect
  console.log("projects", projects);
  const projectOptions = projects?.map((project) => ({
    value: project.id, // Using 'id' as the unique identifier
    label: project.name,
    project: {
      id: project.id,
      name: project.name,
      prefix: project.prefix,
    },
  }));
  return (
    <div>
      <FormikSelect
        options={sessionOptions}
        label="Session Type"
        name="Session Type"
        placeholder="Select Session Type"
      />
      <FormikSelect
        options={projectOptions || []}
        label="Project"
        name="Project"
        placeholder="Select Project"
      />
      <FormikSelect
        options={progressOptions}
        label="Progress"
        name="Progress"
        placeholder="Select Progress"
      />
    </div>
  );
};
