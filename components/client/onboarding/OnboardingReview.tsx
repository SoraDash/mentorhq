"use client"
import { useStepStore } from '@/store/useStepStore';
import React from 'react';

const OnboardingReview: React.FC = () => {
  const { formData } = useStepStore();
  const getMergedFormData = () => {
    const mergedData = {
      ...formData.name,
      ...formData.misc,
      ...formData.social,
      ...formData.custom
    };
    return mergedData;
  };

  const mergedData = getMergedFormData()

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-5">Review your details:</h2>
      <div>
        {/* Display form data */}
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(mergedData, null, 2)}</pre>
      </div>

    </div>
  );
}

export default OnboardingReview;
