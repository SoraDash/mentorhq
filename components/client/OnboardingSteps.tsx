"use client"

import React, { useState, useEffect } from 'react';
import useOnboardingModal from '@/hooks/useOnboardingModal';
import { User } from '@prisma/client';
import Image from 'next/image';
import { GoZap } from 'react-icons/go';
import { LiaCheckSolid, LiaTimesSolid } from 'react-icons/lia';
import { RiRocketFill } from 'react-icons/ri';
import CalendlyAuth from './Calendly';

async function fetchUserData() {
  const response = await fetch('/api/user');

  if (!response.ok) {
    throw new Error("Failed to fetch user data.");
  }

  const userData = await response.json();
  return userData;
}
export const OnboardingSteps = ({ user: initialUser }: { user: Partial<User> }) => {
  const [user, setUser] = useState(initialUser);
  const modal = useOnboardingModal();

  useEffect(() => {
    async function initialFetch() {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    initialFetch();
  }, []);

  const featureConfig = [
    {
      condition: !user.ciApiKey,
      missingText: "No Code Institute API key. Stats like student sessions can't be displayed.",
      successText: "Code Institute API key is set."
    },
    {
      condition: !user.isOnboarded,
      missingText: "Profile not complete. Finish onboarding for a better experience.",
      successText: "Profile is complete."
    },
    {
      condition: !user.ciEmail,
      missingText: "Mismatch or absence of CI's Google Sheets API email. It's case-sensitive!",
      successText: "CI's Google Sheets API email is correctly set."
    },
    {
      condition: !user.calendly_token,
      missingText: "Calendly not authorized. Enable to view latest events.",
      successText: "Calendly is authorized!"
    }
  ];

  const allFeaturesChecked = featureConfig.every(feature => !feature.condition);

  if (allFeaturesChecked) return null;

  return (
    <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center py-12">
        <div className='relative h-72 w-72'>
          <Image alt='Empty' fill src='/empty.png' className="w-24 h-24 mb-4" />
        </div>
        <h2 className="text-3xl font-semibold mb-2">Welcome, {user.name}!</h2>
        <p className="text-gray-600 text-center text-lg leading-relaxed">
          Start your journey with us. However, some features require setup:
        </p>
        <ul className="mt-4 text-gray-600 text-center text-base leading-relaxed">
          {featureConfig.map((feature, index) => (
            <li key={index} className="mb-2 flex items-center justify-center">
              {feature.condition
                ? <>
                  <LiaTimesSolid className="text-red-500 mr-2" />
                  {feature.missingText}
                </>
                : <>
                  <LiaCheckSolid className="text-green-500 mr-2" />
                  {feature.successText}
                </>
              }
            </li>
          ))}
        </ul>

        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 inline-flex items-center"
          onClick={modal.onOpen}
        >
          Get Started
          <GoZap className="w-4 h-4 ml-2 fill-white" />
        </button>
        <button className='mt-6 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 inline-flex items-center' onClick={async () => {
          try {
            const updatedUser = await fetchUserData();
            setUser(updatedUser);
          } catch (error) {
            console.error("Error re-fetching user data:", error);
          }
        }}>
          Re-check features
          <RiRocketFill className="w-4 h-4 ml-2 fill-white" />
        </button>

        <CalendlyAuth />
      </div>
    </div>
  );
}
