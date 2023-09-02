"use client"
import MiscForm from '@/components/server/forms/onboarding/MiscForm';
import NameForm from '@/components/server/forms/onboarding/NameForm';
import SocialForm from '@/components/server/forms/onboarding/SocialForm';
import { getUser } from '@/lib/auth/auth';
import { useStepStore } from '@/store/useStepStore';
import React, { useEffect } from 'react';
import OnboardingReview from './OnboardingReview';

const OnboardingForm: React.FC = () => {
  const { currentStep, setCurrentStep, updateFormData } = useStepStore();
  const formData = useStepStore(state => state.formData);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();
      if (user) {
        const nameData = {
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
        };
        const miscData = {
          ciEmail: user.email || undefined,
          ciApiKey: user.ciApiKey || undefined,
          paidPerHour: user.paidPerHour || undefined,
          sendWelcomeEmail: user.sendWelcomeEmail || undefined,
          website: user.website
        };
        const socialData = {
          github: user.github || undefined,
          twitter: user.twitter || undefined,
          linkedIn: user.linkedIn || undefined,
          slack: user.slack || undefined,
          skype: user.skype || undefined
        };

        updateFormData('name', nameData);
        updateFormData('misc', miscData);
        updateFormData('social', socialData);
      }
    };

    fetchUserData();
  });



  const forms = [
    NameForm,
    MiscForm,
    SocialForm,
    OnboardingReview  // This makes it easier to add more forms in the future
  ];

  const goToNextStep = () => {
    if (currentStep < forms.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getMergedFormData = () => {
    const mergedData = {
      ...formData.name,
      ...formData.misc,
      ...formData.social,
      ...formData.custom
    };
    return mergedData;
  };

  const mergedData = getMergedFormData();

  const handleSubmit = () => {
    console.log("Submitting form data:", mergedData);
  };

  const CurrentFormComponent = forms[currentStep] || (() => <div>Error: Unknown step!</div>);

  return (
    <div>
      <CurrentFormComponent />

      <div className="mt-4 flex justify-between">
        {currentStep > 0 && (
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded"
            onClick={goToPreviousStep}
          >
            Previous
          </button>
        )}

        {currentStep < forms.length - 1 && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={goToNextStep}
          >
            Next
          </button>
        )}

        {currentStep === forms.length - 1 && (
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
}

export default OnboardingForm;
