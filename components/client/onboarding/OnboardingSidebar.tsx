"use client"
import { useStepStore } from '@/store/useStepStore';
import React from 'react';
import { AiFillProfile } from 'react-icons/ai';
import { BsGlobeAmericas, BsPersonBoundingBox } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { SiCodereview } from 'react-icons/si';
import { ThemeToggle } from '../ThemeToggle';

const OnboardingSidebar: React.FC = () => {
  const { currentStep, goTo, maxStep } = useStepStore();

  const stepsInfo = [
    {
      defaultIcon: BsPersonBoundingBox,
      title: "Personal Info",
      details: "Name & Contact"
    },
    {
      defaultIcon: AiFillProfile,
      title: "Profile Info",
      details: "Bio & Skills"
    },
    {
      defaultIcon: BsGlobeAmericas,
      title: "Social Info",
      details: "Links & Handles"
    },
    {
      defaultIcon: SiCodereview,
      title: "Confirmation",
      details: "Final Review",
    }
  ].map((step, index) => ({
    ...step,
    isCompleted: currentStep > index,
  }));

  return (
    <ol className="flex flex-col items-center space-y-4 text-gray-200  list-none p-0 m-0 w-full">
      {stepsInfo.map((step, index) => {
        let Icon;
        if (currentStep === index) {
          Icon = FaQuestion;
        } else {
          Icon = step.isCompleted ? GiConfirmed : step.defaultIcon;
        }

        const color = currentStep === index ? "text-white" : (step.isCompleted ? "text-white" : "text-white");
        const bg = currentStep === index ? 'bg-primary-purple tex-white' : (step.isCompleted ? 'bg-green-500 text-shite' : '');
        const isFirstStep = index === 0;
        const isClickable = isFirstStep
          || (index === currentStep - 1 && currentStep !== maxStep)
          || index === currentStep;

        return (
          <li
            key={index}
            className={`flex justify-start items-center px-4 py-2 w-full ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${bg}`}
            onClick={() => {
              if (isClickable) {
                goTo(index);
              }
            }}
          >
            <span className={`${color} mr-4`}>
              {currentStep === index ? (
                <Icon icon={Icon} className="w-6 h-6" />
              ) : (
                <Icon className="w-6 h-6" />
              )}
            </span>
            <div className="flex-grow">
              <h3 className="font-medium leading-tight">{step.title}</h3>
              {step.details && <p className="text-sm">{step.details}</p>}
            </div>
          </li>
        )
      })}
      {/* Toggle Logout and theme selection buttons */}
    </ol>
  );
};

export default OnboardingSidebar;
