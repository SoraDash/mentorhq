import OnboardingFlow from '@/components/client/onboarding/Onboarding';
import React from 'react';

const OnboardingPage: React.FC = async () => {

  return (
    <div className="flex-1 p-5">
      <OnboardingFlow />
    </div>
  );
}

export default OnboardingPage;