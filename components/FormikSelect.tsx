import { useField } from "formik";
import React, { useState } from "react";
import { Avatar, Select, SelectItem, cn } from "@nextui-org/react";

// Define interfaces for SessionType and Project
interface SessionType {
  name: string;
  icon: string;
}

interface Project {
  name: string;
  prefix: string;
}

interface Option {
  value: string;
  label?: string;
  description?: string;
  image?: string;
  emoji?: string;
  sessionType?: SessionType;
  project?: Project;
}

interface FormikSelectProps {
  name: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  options: Option[];
}

export const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  console.log("FormikSelect", options);
  const [field, meta, helpers] = useField(props.name);
  const { setValue, setTouched } = helpers;
  const [description, setDescription] = useState<string>("");
  const isValid = meta.touched ? !meta.error : true;

  const handleSelectionChange = (value: string) => {
    setValue(value);
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption && selectedOption.description) {
      setDescription(selectedOption.description);
    } else {
      setDescription("");
    }
  };

  return (
    <Select
      {...props}
      label={label}
      isInvalid={isValid}
      description={description}
      value={field.value}
      isRequired={props.isRequired}
      errorMessage={meta.error}
      className={cn("w-full space-y-5", className)}
      onChange={(e) => handleSelectionChange(e.target.value)}
      onClose={() => setTouched(true)}>
      {options.map((option) => (
        <SelectItem
          key={option.value}
          textValue={option.value}>
          <div className="flex gap-2 items-center">
            {option.image && (
              <Avatar
                src={option.image}
                alt={option.label}
                className="flex-shrink-0"
                size="sm"
                name={option.emoji}
              />
            )}
            {option.sessionType && (
              <Avatar
                alt={option.sessionType.name}
                className="flex-shrink-0"
                size="sm"
                name={option.sessionType.icon}
              />
            )}
            {option.project && (
              <Avatar
                alt={option.project.name}
                className="flex-shrink-0"
                size="sm"
                name={option.project.prefix}
              />
            )}
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="text-small">
                  {option.label ||
                    option.sessionType?.name ||
                    option.project?.name}
                </span>
              </div>
              <span className="text-tiny text-default-400">
                {option.description}
              </span>
            </div>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};
