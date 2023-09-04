import LoadingSpinner from '@/components/client/LoadingSpinner';
import OnboardingForm from '@/components/client/onboarding/OnboardingForm';
import React, { Suspense } from 'react';

const OnboardingPage: React.FC = async () => {

  return (
    <div className="w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <OnboardingForm />
      </Suspense>
    </div>
  );
}

export default OnboardingPage;