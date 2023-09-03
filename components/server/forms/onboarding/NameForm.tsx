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
    <div className="grid grid-cols-1 gap-4 mt-3 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
        First Name
      </label>
      <Input
        id="firstName"
        type="text"
        value={formData.firstName || ""}
        onChange={(e) => updateFields({ firstName: e.target.value })}
        className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="lastName">
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
  );
};

export default NameForm;
