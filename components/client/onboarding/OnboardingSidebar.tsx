"use client";

import { useStepStore } from '@/store/useStepStore';
import React from 'react';
import { AiFillProfile } from 'react-icons/ai';
import { BsGlobeAmericas, BsPersonBoundingBox } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { SiCodereview } from 'react-icons/si';

interface OnboardingSidebarProps { }

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = () => {
  const { currentStep, goTo, isLastStep } = useStepStore();

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

        let Icon;

        if (currentStep === index) {
          Icon = FaQuestion;
        } else {
          Icon = step.isCompleted ? GiConfirmed : step.defaultIcon;
        }

        const color = currentStep === index ? "text-orange-500" : (step.isCompleted ? "text-green-500" : "text-white");

        const isFirstStep = index === 0;
        const isClickable = isFirstStep || (!isLastStep && (index === currentStep - 1 || index === currentStep || index === currentStep + 1));

        return (
          <li
            key={index}
            className={`flex items-center space-x-4 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => {
              if (isClickable) {
                goTo(index);
              }
            }}
          >
            <span className={color}>
              {currentStep === index ? (
                <Icon icon={Icon} className="w-6 h-6" />
              ) : (
                <Icon className="w-6 h-6" />
              )}
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
};