'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import { useStepStore } from '@/store/useStepStore';
import { SocialFormData } from '@/types/FormDataTypes';

const SocialForm: React.FC = () => {
  const formData = useStepStore((state) => state.formData.social || {});
  const updateFormData = useStepStore((state) => state.updateFormData);

  const updateFields = (fields: Partial<SocialFormData>) => {
    updateFormData('social', fields);
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-3 mb-4">
      <div className="col-span-2 sm:col-span-1">
        <label
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
          htmlFor="github"
        >
          GitHub Username
        </label>
        <Input
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
          id="github"
          onChange={(e) => updateFields({ github: e.target.value })}
          type="text"
          value={formData.github || ''}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
          htmlFor="slack"
        >
          Slack Username
        </label>
        <Input
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
          id="slack"
          onChange={(e) => updateFields({ slack: e.target.value })}
          type="text"
          value={formData.slack || ''}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
          htmlFor="linkedIn"
        >
          LinkedIn Profile URL
        </label>
        <Input
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
          id="linkedIn"
          onChange={(e) => updateFields({ linkedIn: e.target.value })}
          type="text"
          value={formData.linkedIn || ''}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
          htmlFor="skype"
        >
          Skype Username
        </label>
        <Input
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
          id="skype"
          onChange={(e) => updateFields({ skype: e.target.value })}
          type="text"
          value={formData.skype || ''}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
          htmlFor="twitter"
        >
          Twitter Handle
        </label>
        <Input
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
          id="twitter"
          onChange={(e) => updateFields({ twitter: e.target.value })}
          type="text"
          value={formData.twitter || ''}
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
          htmlFor="website"
        >
          Website URL
        </label>
        <Input
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
          id="website"
          onChange={(e) => updateFields({ website: e.target.value })}
          type="url"
          value={formData.website || ''}
        />
      </div>
    </div>
  );
};

export default SocialForm;
