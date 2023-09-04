"use client"
import { Input } from '@/components/ui/input';
import { useStepStore } from '@/store/useStepStore';
import { SocialFormData } from '@/types/FormDataTypes';
import React from 'react';

const SocialForm: React.FC = () => {
  const formData = useStepStore(state => state.formData.social || {});
  const updateFormData = useStepStore(state => state.updateFormData);

  const updateFields = (fields: Partial<SocialFormData>) => {
    updateFormData('social', fields);
  };
  return (
    <div className="grid grid-cols-1 gap-4 mt-3 mb-4">
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="github">
          GitHub Username
        </label>
        <Input
          type="text"
          id="github"
          value={formData.github || ""}
          onChange={(e) => updateFields({ github: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="slack">
          Slack Username
        </label>
        <Input
          type="text"
          id="slack"
          value={formData.slack || ""}
          onChange={(e) => updateFields({ slack: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="linkedIn">
          LinkedIn Profile URL
        </label>
        <Input
          type="text"
          id="linkedIn"
          value={formData.linkedIn || ""}
          onChange={(e) => updateFields({ linkedIn: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="skype">
          Skype Username
        </label>
        <Input
          type="text"
          id="skype"
          value={formData.skype || ""}
          onChange={(e) => updateFields({ skype: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="twitter">
          Twitter Handle
        </label>
        <Input
          type="text"
          id="twitter"
          value={formData.twitter || ""}
          onChange={(e) => updateFields({ twitter: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="website">
          Website URL
        </label>
        <Input
          type="url"
          id="website"
          value={formData.website || ""}
          onChange={(e) => updateFields({ website: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SocialForm;
