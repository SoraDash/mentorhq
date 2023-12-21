/* eslint-disable no-unused-vars */
'use client';

import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { FormData, useStepStore } from '@/store/useStepStore';

import SensitiveInfo from '../SensetiveInfo';

type CustomTitleMap = {
  [K in keyof FormData]: {
    [J in keyof FormData[K]]: string;
  };
};

const OnboardingReview: React.FC = () => {
  const { formData } = useStepStore();

  const customTitles: CustomTitleMap = {
    name: {
      firstName: 'First Name',
      lastName: 'Last Name',
    },
    misc: {
      sendWelcomeEmail: 'Send welcome email',
      ciAPIKey: 'Your API Key',
      ciEmail: 'Google Sheet Email',
    },
    // ... other sections as necessary
  };

  const getTitle = (section: keyof FormData, key: string): string => {
    return (
      customTitles[section as keyof CustomTitleMap]?.[
        key as keyof CustomTitleMap[keyof CustomTitleMap]
      ] || key
    );
  };

  const displayValue = (key: string, value: any) => {
    if (key === 'sendWelcomeEmail') {
      return value ? (
        <FaCheck className="text-green-500 w-6 h-6" />
      ) : (
        <FaTimes className="text-red-500  w-6 h-6" />
      );
    }

    if (key === 'ciApiKey') {
      return <SensitiveInfo value={value} />;
    }

    return value;
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-2xl lg p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-5">Review your details:</h2>

        {Object.entries(formData).map(([sectionKey, sectionData], index) => (
          <div className="mb-5" key={sectionKey}>
            <h3 className="text-xl font-bold mb-3 capitalize">{sectionKey}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Object.entries(sectionData).map(([key, value]) =>
                key === 'sendWelcomeEmail' ? (
                  <div className="col-span-3 flex items-center" key={key}>
                    <h4 className="capitalize font-semibold mr-2">
                      {getTitle(sectionKey as keyof FormData, key)}
                    </h4>
                    {displayValue(key, value)}
                  </div>
                ) : (
                  <div key={key}>
                    <h4 className="capitalize font-semibold">
                      {getTitle(sectionKey as keyof FormData, key)}
                    </h4>
                    <p className="mt-2">{displayValue(key, value)}</p>
                  </div>
                ),
              )}
            </div>
            {index < Object.keys(formData).length - 1 && (
              <hr className="mt-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingReview;
