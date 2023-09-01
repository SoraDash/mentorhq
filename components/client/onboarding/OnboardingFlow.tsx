import { onboardUser } from '@/actions/user.actions';
import MiscForm from '@/components/server/forms/onboarding/MiscForm';
import NameForm from '@/components/server/forms/onboarding/NameForm';
import SocialForm from '@/components/server/forms/onboarding/SocialForm';
import { useToast } from '@/components/ui/use-toast';
import { useMultistepForm } from '@/hooks/useMultiStepForm';
import { getUser } from '@/lib/auth/auth';
import { INITIAL_DATA } from '@/lib/validations/UserValidation';
import { CustomFormData } from '@/types/FormDataTypes';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';

interface OnboardingFlowProps {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onSubmit, initialData }) => {


  function submitOnboarding(e: FormEvent, onboarding = true) {

  }


  return (
    <form onSubmit={submitOnboarding}>
      {step}
      <div className="flex justify-between items-center mt-4">
        {!isFirstStep && (
          <button
            type="button"
            onClick={back}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        )}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OnboardingFlow;
