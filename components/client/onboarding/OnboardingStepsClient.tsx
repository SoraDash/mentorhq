"use client"
import { checkStatus } from '@/actions/onboarding.actions';
import { BooleanIcon } from '@/components/server/BooleanIcon';
import useOnboardingModal from '@/hooks/useOnboardingModal';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import { GoZap } from 'react-icons/go';
import { RiRocketFill } from 'react-icons/ri';

interface OnboardingStepsClientProps {
  user: Partial<User> | null;
}

interface FeatureConfig {
  condition: boolean;
  missingText: string;
  successText: string;
}

const OnboardingStepsClient: React.FC<OnboardingStepsClientProps> = ({ user }) => {
  const modal = useOnboardingModal();

  const featureConfig: FeatureConfig[] = [
    {
      condition: !user?.ciApiKey,
      missingText: "No Code Institute API key. Stats like student sessions can't be displayed.",
      successText: "Code Institute API key is provided."
    },
    {
      condition: !user?.isOnboarded,
      missingText: "Profile not complete.",
      successText: "Profile is complete."
    },
    {
      condition: !user?.ciEmail,
      missingText: "Mismatch or absence of CI's Google Sheets API email. It's case-sensitive!",
      successText: "CI's Google Sheets API email is correctly set."
    },
    {
      condition: !user?.calendly_token,
      missingText: "Calendly not authorized. Enable to view latest events.",
      successText: "You are authenticated with Calendly!"
    }
  ];

  const allFeaturesChecked = featureConfig.every(feature => !feature.condition);
  const [status, setStatus] = useState(false);
  const isInitialVisit = !user?.ciApiKey && !user?.ciEmail && !user?.calendly_token;
  const incompleteProfile = user?.isOnboarded === false && !isInitialVisit;

  const handleRefetch = async () => {
    try {
      setStatus(true)
      await checkStatus()

    } catch (error) {
      console.log(error)
    } finally {
      setStatus(false)
    }

  }
  return (
    <div>
      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        {featureConfig.map((feature, index) => (
          <li key={index} className="flex items-center">
            <BooleanIcon condition={feature.condition} missingText={feature.missingText} successText={feature.successText} />
            {/* {feature.condition ? (
              <>
                <LiaTimesSolid className="w-3.5 h-3.5 mr-2 text-red-500 dark:text-red-400 flex-shrink-0" />
                {feature.missingText}
              </>
            ) : (
              <>
                <LiaCheckSolid className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                {feature.successText}
              </>
            )} */}
          </li>
        ))}
      </ul>

      <div className={`flex flex-row justify-between`}>

        {!user?.isOnboarded && (
          <>
            {isInitialVisit ? (
              <button
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 inline-flex items-center"
                onClick={modal.onOpen}
              >
                Get Started
                <GoZap className="w-4 h-4 ml-2 fill-white" />
              </button>
            ) : (
              <button
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 inline-flex items-center"
                onClick={modal.onOpen}
              >
                Finish Profile
                <GoZap className="w-4 h-4 ml-2 fill-white" />
              </button>
            )}
          </>
        )}

        {!allFeaturesChecked && (
          <button className='mt-6 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 inline-flex items-center' onClick={handleRefetch}>
            {status ? (
              <>
                Sync in progress...
                <RiRocketFill className="ml-2 animate-bounce" />
              </>
            ) : (
              <> Re-check status <RiRocketFill className="ml-2" /></>
            )}
          </button>
        )}

      </div>
    </div>
  );
};

export default OnboardingStepsClient;
