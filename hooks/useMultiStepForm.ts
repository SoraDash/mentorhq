import { ReactElement, useState } from 'react';

interface StepConfig {
  title: string;
  description: string;
  component: ReactElement;
}

export function useMultistepForm(stepConfigs: StepConfig[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= stepConfigs.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: stepConfigs[currentStepIndex].component,
    stepTitles: stepConfigs.map((config) => config.title),
    stepDescriptions: stepConfigs.map((config) => config.description),
    steps: stepConfigs.map((config) => config.component),
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === stepConfigs.length - 1,
    goTo,
    next,
    back,
  };
}
