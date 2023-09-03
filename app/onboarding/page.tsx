import OnboardingForm from '@/components/client/onboarding/OnboardingForm';
import React from 'react';

const OnboardingPage: React.FC = async () => {

  return (
    <div className="flex-1 p-5">
      <OnboardingForm />
    </div>
  );
}

export default OnboardingPage;