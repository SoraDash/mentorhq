"use client"
import { useFormik } from 'formik';
import React from 'react';
import { FaCalendar, FaCheck, FaExclamationTriangle, FaInfo, FaStickyNote } from 'react-icons/fa';
import { StepA } from './StepA';
import { StepB } from './StepB';
import { StepC } from './StepC';
import { StepD } from './StepD';
import { StepE } from './StepE';
import { StepFinal } from './StepFinal';

interface MultiStepFormProps {
  showStepNumber: boolean;
}

type StepIconTextMapping = {
  [key in Exclude<StepsEnum, StepsEnum.FINAL>]: {
    icon: React.ReactNode;
    text: string;
  };
};

export enum StepsEnum {
  DATE_TIME = 'DATE_TIME',
  SESSION_INFO = 'SESSION_INFO',
  SESSION_NOTES = 'SESSION_NOTES',
  CI_INFO = 'CI_INFO',
  CONFIRMATION = 'CONFIRMATION',
  FINAL = 'FINAL'
}

const initialFormData = {
  sessionDate: new Date().toISOString(),
  sessionTime: "",
  sessionType: "",
  projectType: "",
  sessionProgress: "",
  summary: "",
  personalNotes: "",
  resubmission: false,
  ciFollowUp: false,
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  showStepNumber
}) => {
  const [currentStep, setCurrentStep] = React.useState(StepsEnum.DATE_TIME);
  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: values => {
      setCurrentStep(StepsEnum.FINAL);
      console.log(values);
    },
  });

  const stepSequence = Object.values(StepsEnum).filter(step => step !== StepsEnum.FINAL);

  const nextStep = () => {
    const index = stepSequence.indexOf(currentStep);
    if (index < stepSequence.length - 1) {
      setCurrentStep(stepSequence[index + 1]);
    }
  }

  const prevStep = () => {
    const index = stepSequence.indexOf(currentStep);
    if (index > 0) {
      setCurrentStep(stepSequence[index - 1]);
    }
  }

  const renderTopStepNumbers = () => {
    if (!showStepNumber || currentStep === StepsEnum.FINAL) return null;

    const stepIconsAndText: StepIconTextMapping = {
      [StepsEnum.DATE_TIME]: { icon: <FaCalendar />, text: "Date & Time" },
      [StepsEnum.SESSION_INFO]: { icon: <FaInfo />, text: "Session Info" },
      [StepsEnum.SESSION_NOTES]: { icon: <FaStickyNote />, text: "Session Notes" },
      [StepsEnum.CI_INFO]: { icon: <FaExclamationTriangle />, text: "CI Info" },
      [StepsEnum.CONFIRMATION]: { icon: <FaCheck />, text: "Confirmation" },
    };

    return (
      <div className="mt-2 mb-4 flex justify-between">
        { stepSequence.map(step => (
          <div key={ step }
            className={ `w-24 h-24 p-2 rounded-full border-2 border-600 flex flex-col items-center justify-center ${step === currentStep ? 'bg-primary' : ''}` }
            onClick={ () => setCurrentStep(step) }
          >
            { stepIconsAndText[step].icon }
          </div>
        )) }
      </div>
    );
  }
  return (
    <div className='px-6 py-1 mx-auto rounded-lg cursor-pointer'>
      <form onSubmit={ formik.handleSubmit }>
        { renderTopStepNumbers() }
        { currentStep === StepsEnum.DATE_TIME && <StepA /> }
        { currentStep === StepsEnum.SESSION_INFO && <StepB /> }
        { currentStep === StepsEnum.SESSION_NOTES && <StepC /> }
        { currentStep === StepsEnum.CI_INFO && <StepD /> }
        { currentStep === StepsEnum.CONFIRMATION && <StepE /> }
        { currentStep === StepsEnum.FINAL && <StepFinal /> }
      </form>
    </div>
  );
}
