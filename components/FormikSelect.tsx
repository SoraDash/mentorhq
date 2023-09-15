"use client"
import { courses } from '@/prisma/data';
import { Avatar, Select, SelectItem, cn } from '@nextui-org/react';
import { useField } from 'formik';
import React, { useState } from 'react';

interface FormikSelectProps {
  name: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  options: { value: string; label: string; description?: string, prefix?: string, projectCount?: number, image?: string }[];
}


export const FormikSelect: React.FC<FormikSelectProps> = ({ label, options, className, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue, setTouched } = helpers;
  const [description, setDescription] = useState<string>("");
  const isValid = meta.touched ? !meta.error : true;

  const handleSelectionChange = (value: string) => {
    setValue(value);
    const selectedCourse = courses.find(course => course.courseCode === value);
    if (selectedCourse) {
      setDescription(selectedCourse.description);
    } else {
      setDescription("");
    }
  }
  return (
    <Select
      { ...props }
      label={ label }
      isInvalid={ isValid }
      description={ description }
      value={ field.value }
      isRequired={ props.isRequired }
      errorMessage={ meta.error }
      className={ cn("w-full space-y-5", className) }
      onChange={ (e) => handleSelectionChange(e.target.value) }
      onClose={ () => setTouched(true) }
    >
      { options.map((option) => (
        <SelectItem key={ option.value } textValue={ option.value }>
          <div className="flex gap-2 items-center">
            <Avatar src={ option.image } alt={ option.label } className="flex-shrink-0" size="sm" name={ `${option.prefix}${option.projectCount}` || option.label } />
            <div className="flex flex-col">
              <span className="text-small">{ option.label }</span>
              <span className="text-tiny text-default-400">{ option.value }</span>
            </div>
          </div>
        </SelectItem>
      )) }
    </Select>
  );
};
