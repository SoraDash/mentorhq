import { Select, Avatar, SelectItem } from "@nextui-org/react";
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
    startContent: <>👎</>,
  },
  {
    text: "Average",
    value: "AVERAGE",
    startContent: <>👍</>,
  },
  {
    text: "Excellent",
    value: "EXCELLENT",
    startContent: <>🙌</>,
  },
];

export const StepB: React.FC<StepBProps> = ({ sortedSessions, projects }) => {
  const { values, handleChange } = useFormikContext<FormikValues>();
  return (
    <div>
      <Select
        items={sortedSessions}
        label="Session Type"
        placeholder="Select Session Type"
        labelPlacement="outside"
        classNames={{
          trigger: "h-12",
        }}
        renderValue={(items) => {
          return items.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-2">
              <Avatar
                alt={item.data?.name}
                className="flex-shrink-0"
                size="sm"
                color="default"
                name={item.data?.icon}
              />
              <div className="flex flex-col">
                <span>{item?.data?.name}</span>
              </div>
            </div>
          ));
        }}>
        {(session) => (
          <SelectItem
            key={session.id}
            textValue={session.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={session.name}
                className="flex-shrink-0"
                size="sm"
                color="default"
                name={session.icon}
              />
              <div className="flex flex-col">
                <span className="text-small">{session.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Select
        items={projects}
        label="Project"
        placeholder="Select Project"
        labelPlacement="outside"
        classNames={{
          trigger: "h-12",
        }}
        renderValue={(items) => {
          return items.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-2">
              <Avatar
                alt={item.data?.prefix.toUpperCase()}
                className="flex-shrink-0"
                size="sm"
                color="danger"
                name={item.data?.prefix.toUpperCase()}
              />
              <div className="flex flex-col">
                <span>{item?.data?.name}</span>
              </div>
            </div>
          ));
        }}>
        {(project) => (
          <SelectItem
            key={project.id}
            textValue={project.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={project.name}
                className="flex-shrink-0"
                size="sm"
                color="danger"
                name={project.prefix.toUpperCase()}
              />
              <div className="flex flex-col">
                <span className="text-small">{project.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Select
        label="Progress"
        placeholder="Select student progress">
        {progressOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            startContent={option.startContent}>
            {option.text}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
