"use client";
import { getUser } from '@/lib/auth/auth';
import { useStepStore } from '@/store/useStepStore';
import React, { useEffect } from 'react';

const OnboardingForm: React.FC = () => {
  const { currentStep, updateFormData, back, next, steps, isFirstStep } = useStepStore();
  const formData = useStepStore(state => state.formData);
  const isLastStep = useStepStore(state => state.isLastStep);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();
      if (user) {
        const nameData = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        };
        const miscData = {
          ciEmail: user.email || "",
          ciApiKey: user.ciApiKey || "",
          paidPerHour: user.paidPerHour || 0,
          sendWelcomeEmail: user.sendWelcomeEmail || false,
          website: user.website || ""
        };
        const socialData = {
          github: user.github || "",
          twitter: user.twitter || "",
          linkedIn: user.linkedIn || "",
          slack: user.slack || "",
          skype: user.skype || ""
        };

        updateFormData('name', nameData);
        updateFormData('misc', miscData);
        updateFormData('social', socialData);
      }
    };

    fetchUserData();
  }, [updateFormData]);



  const getMergedFormData = () => {
    const mergedData = {
      ...formData.name,
      ...formData.misc,
      ...formData.social,
    };
    return mergedData;
  };

  const mergedData = getMergedFormData();

  const handleSubmit = () => {
    console.log("Submitting form data:", mergedData);
  };

  const CurrentFormComponent = steps[currentStep] || (() => <div>Error: Unknown step!</div>);
  console.log("Current Step:", currentStep, "Total Steps:", steps.length);

  return (
    <div>
      <CurrentFormComponent />

      <div className="mt-4 flex justify-between">
        {/* Show Back button if it's not the first step */}
        {!isFirstStep && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={back}
          >
            Back
          </button>
        )}

        {/* Show Next button if it's not the last step */}
        {!isLastStep && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={next}
          >
            Next
          </button>
        )}

        {/* Show Submit button only on the last step */}
        {isLastStep && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;