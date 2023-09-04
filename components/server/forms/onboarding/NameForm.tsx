"use client"
import { Input } from '@/components/ui/input';
import { useStepStore } from '@/store/useStepStore';
import { NameFormData } from '@/types/FormDataTypes';
import React from 'react';

const NameForm: React.FC = () => {
  const formData = useStepStore(state => state.formData.name || {});
  const updateFormData = useStepStore(state => state.updateFormData);

  const updateFields = (fields: Partial<NameFormData>) => {
    updateFormData('name', fields);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-white text-sm font-bold" htmlFor="firstName">
          First Name
        </label>
        <Input
          id="firstName"
          type="text"
          value={formData.firstName || ""}
          onChange={(e) => updateFields({ firstName: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 dark:text-white text-sm font-bold" htmlFor="lastName">
          Last Name
        </label>
        <Input
          id="lastName"
          type="text"
          value={formData.lastName || ""}
          onChange={(e) => updateFields({ lastName: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
    </div>

  );
};

export default NameForm;
