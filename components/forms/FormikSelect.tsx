'use client';

import { Select, SelectItem, cn } from '@nextui-org/react';
import { FormikValues, useField, useFormikContext } from 'formik';
import React, { useState } from 'react';

import { OptionItem } from './OptionItem';

// Define interfaces for SessionType and Project
interface SessionType {
  icon: string;
  name: string;
}

interface Project {
  name: string;
  prefix: string;
}

interface Option {
  description?: string;
  emoji?: string;
  image?: string;
  label?: string;
  project?: Project;
  sessionType?: SessionType;
  value: string;
}
interface FormikSelectProps {
  className?: string;
  defaultValue?: Option;
  isRequired?: boolean;
  label: string;
  name: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export const FormikSelect: React.FC<FormikSelectProps> = ({
  className,
  defaultValue,
  label,
  onChange,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);
  const { setTouched } = helpers;
  const { setFieldValue } = useFormikContext<FormikValues>();

  const defaultHandleSelectionChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);

    if (selectedOption) {
      setFieldValue(props.name, selectedOption);
    }
  };

  return (
    <Select
      {...props}
      aria-label={label}
      className={cn('space-y-5 w-full', className)}
      defaultSelectedKeys={defaultValue ? [defaultValue.value] : []}
      errorMessage={meta.error}
      isInvalid={meta.touched && !!meta.error}
      isRequired={props.isRequired}
      label={label}
      onChange={(e) =>
        onChange
          ? onChange(e.target.value)
          : defaultHandleSelectionChange(e.target.value)
      }
      onClose={() => setTouched(true)}
      value={field.value}
    >
      {options.map((option) => (
        <SelectItem
          key={option.value}
          textValue={option.label || ''}
          value={option.value}
        >
          <OptionItem
            emoji={option.emoji}
            image={option.image}
            label={option.label || ''}
          />
        </SelectItem>
      ))}
    </Select>
  );
};
