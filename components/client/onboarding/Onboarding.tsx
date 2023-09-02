"use client"
import OnboardingReview from '@/components/client/onboarding/OnboardingReview';
import { useStepStore } from '@/store/useStepStore';
import React from 'react';
import OnboardingForm from './OnboardingForm';

const OnboardingFlow: React.FC = () => {
  const { currentStep } = useStepStore();

  return (
    <div className="flex-1 p-5">
      {currentStep < 3 ? <OnboardingForm /> : <OnboardingReview />}
    </div>
  );
}

export default OnboardingFlow;