"use client";

import { useStepStore } from '@/store/useStepStore';
import React from 'react';
import { AiFillProfile } from 'react-icons/ai';
import { BsGlobeAmericas, BsPersonBoundingBox } from 'react-icons/bs';
import { GiConfirmed } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
import { IoShareSocialSharp } from 'react-icons/io5';
import { PiCardholder } from 'react-icons/pi';
import { SiCodereview } from 'react-icons/si';

interface OnboardingSidebarProps { }

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = () => {
  const { currentStep } = useStepStore();

  const stepsInfo = [
    {
      isCompleted: currentStep > 0,
      defaultIcon: BsPersonBoundingBox,
      title: "Personal Info",
      details: "Step details here"
    },
    {
      isCompleted: currentStep > 1,
      defaultIcon: AiFillProfile,
      title: "Profile Info",
      details: "Step details here"
    },
    {
      isCompleted: currentStep > 2,
      defaultIcon: BsGlobeAmericas,
      title: "Social Info",
      details: "Step details here"
    },
    {
      isCompleted: currentStep > 3,
      defaultIcon: SiCodereview,
      details: "Step details here",
      title: "Confirmation",
    }
  ];

  return (
    <ol className="flex flex-col items-center space-y-4 text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {stepsInfo.map((step, index) => {
        const Icon = step.isCompleted ? GiConfirmed : step.defaultIcon;
        return (
          <li key={index} className="flex items-center space-x-4">
            <span className={step.isCompleted ? "  text-green-500 " : "text-primary-purple"}>
              <Icon className="w-6 h-6" />
            </span>
            <div>
              <h3 className="font-medium leading-tight">{step.title}</h3>
              {step.details && <p className="text-sm">{step.details}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  );
}
