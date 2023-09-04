import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import CalendlyAuth from '../calendly/Calendly';

interface OnboardingStepsServerProps {
  user: Partial<User> | null;
}

const OnboardingStepsServer: React.FC<OnboardingStepsServerProps> = ({ user }) => {
  return (
    <>
      {!user?.isOnboarded && (
        <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center py-12">
            <div className='relative h-72 w-72'>
              <Image alt='Empty' fill src='/empty.png' className="w-24 h-24 mb-4" />
            </div>
            <h2 className="text-3xl font-semibold mb-2">Welcome, {user?.name}!</h2>
            <p className="text-gray-600 text-center text-lg leading-relaxed">
              Start your journey with us. However, some features require setup:
            </p>

            <CalendlyAuth />

          </div>
        </div>
      )
      }
    </>
  );
};

export default OnboardingStepsServer;
