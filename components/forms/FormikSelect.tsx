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
  onChange?: (value: string) => void;
}

export const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  className,
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);
  const { setTouched } = helpers;
  const [description, setDescription] = useState<string>("");
  const { setFieldValue } = useFormikContext<FormikValues>();

  const defaultHandleSelectionChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);

    if (selectedOption) {
      setFieldValue(props.name, selectedOption);
      setDescription(selectedOption.label || "");
    }
  };

  return (
    <Select
      {...props}
      aria-label={label}
      label={label}
      isInvalid={meta.touched && !!meta.error}
      description={description}
      value={field.value}
      isRequired={props.isRequired}
      errorMessage={meta.error}
      className={cn("w-full space-y-5", className)}
      onChange={(e) =>
        onChange
          ? onChange(e.target.value)
          : defaultHandleSelectionChange(e.target.value)
      }
      onClose={() => setTouched(true)}>
      {options.map((option) => (
        <SelectItem
          key={option.value}
          textValue={option.label || ""}>
          <OptionItem
            label={option.label || ""}
            emoji={option.emoji}
          />
        </SelectItem>
      ))}
    </Select>
  );
};
