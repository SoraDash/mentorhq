import { SocialFormData } from '@/types/FormDataTypes';
import React from 'react';

type SocialFormProps = SocialFormData & {
  // eslint-disable-next-line no-unused-vars
  updateFields: (fields: Partial<SocialFormData>) => void;
};

const SocialForm: React.FC<SocialFormProps> = ({
  github,
  linkedIn,
  skype,
  slack,
  twitter,
  website,
  updateFields,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-3 mb-4">
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="github">
          GitHub Username
        </label>
        <input
          type="text"
          id="github"
          value={github}
          onChange={(e) => updateFields({ github: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slack">
          Slack Username
        </label>
        <input
          type="text"
          id="slack"
          value={slack}
          onChange={(e) => updateFields({ slack: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="linkedIn">
          LinkedIn Profile URL
        </label>
        <input
          type="text"
          id="linkedIn"
          value={linkedIn}
          onChange={(e) => updateFields({ linkedIn: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skype">
          Skype Username
        </label>
        <input
          type="text"
          id="skype"
          value={skype}
          onChange={(e) => updateFields({ skype: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
          Website URL
        </label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(e) => updateFields({ website: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitter">
          Twitter Handle
        </label>
        <input
          type="text"
          id="twitter"
          value={twitter}
          onChange={(e) => updateFields({ twitter: e.target.value })}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SocialForm;
