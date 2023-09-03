/* eslint-disable no-unused-vars */
"use client";
import { FormData, useStepStore } from '@/store/useStepStore';
import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import SensitiveInfo from '../SensetiveInfo';

type CustomTitleMap = {
  [K in keyof FormData]?: {
    [J in keyof FormData[K]]?: string
  }
};



const OnboardingReview: React.FC = () => {
  const { formData } = useStepStore();

  const customTitles: CustomTitleMap = {
    name: {
      firstName: "First Name",
      lastName: "Last Name",
    },
    misc: {
      sendWelcomeEmail: "Are we sending a welcome email?",
      ciAPIKey: "Your API Key",
    },
    // ... other sections as necessary
  };

  const getTitle = (section: keyof FormData, key: string): string => {
    return customTitles[section as keyof CustomTitleMap]?.[key as keyof CustomTitleMap[keyof CustomTitleMap]] || key;
  };

  const displayValue = (key: string, value: any) => {
    if (key === 'sendWelcomeEmail') {
      return value ? <FaCheck className="text-green-500 w-6 h-6" /> : <FaTimes className="text-red-500  w-6 h-6" />;
    }
    if (key === 'ciApiKey') {
      return <SensitiveInfo value={value} />;
    }
    return value;
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-5">
        <h2 className="text-lg font-bold mb-5">Review your details:</h2>

        {Object.entries(formData).map(([sectionKey, sectionData], index) => (
          <div key={sectionKey} className="mb-5">
            <h3 className="text-xl font-medium mb-3 capitalize">{sectionKey}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Object.entries(sectionData).map(([key, value]) => (
                <div key={key}>
                  <h4 className="font-medium capitalize">{getTitle(sectionKey as keyof FormData, key)}</h4>
                  <p>{displayValue(key, value)}</p>
                </div>
              ))}
            </div>
            {index < Object.keys(formData).length - 1 && (
              <hr className="mt-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnboardingReview;
