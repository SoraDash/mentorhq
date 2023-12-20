"use client";
import { Select, SelectItem, cn } from "@nextui-org/react";
import { FormikValues, useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { OptionItem } from "./OptionItem";

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
  const [field, meta, helpers] = useField(props.name);
  const { setValue, setTouched } = helpers;
  const [description, setDescription] = useState<string>("");
  const isValid = meta.touched ? !meta.error : true;
  const { setFieldValue, errors, touched } = useFormikContext<FormikValues>();

  const handleSelectionChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      // Set the entire selected object in Formik's state
      setFieldValue(
        props.name,
        selectedOption.sessionType || selectedOption.project
      );

      // Update the displayed description
      setDescription(selectedOption.label || "");
    }
  };

  return (
    <Select
      {...props}
      aria-label={label} // Providing an aria-label for accessibility
      label={label}
      isInvalid={!isValid}
      description={description}
      value={field.value ? field.value.id : ""}
      isRequired={props.isRequired}
      errorMessage={meta.error}
      className={cn("w-full space-y-5", className)}
      onChange={(e) => handleSelectionChange(e.target.value)}
      onClose={() => setTouched(true)}>
      {options.map((option) => (
        <SelectItem
          key={option.value}
          textValue={description || option.value}>
          <OptionItem
            label={option.label || ""}
            emoji={option.emoji}
            prefix={option.project?.prefix} // Assume project options have a prefix
          />
        </SelectItem>
      ))}
    </Select>
  );
};
