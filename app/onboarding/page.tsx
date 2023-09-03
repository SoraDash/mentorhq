import LoadingSpinner from '@/components/client/LoadingSpinner';
import OnboardingForm from '@/components/client/onboarding/OnboardingForm';
import React, { Suspense } from 'react';

const OnboardingPage: React.FC = async () => {

  return (
    <div className="flex-1 p-5">
      <Suspense fallback={<LoadingSpinner />}>
        <OnboardingForm />
      </Suspense>
    </div>
  );
}

export default OnboardingPage;