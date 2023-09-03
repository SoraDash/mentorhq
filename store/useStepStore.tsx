/* eslint-disable no-unused-vars */
import OnboardingReview from '@/components/client/onboarding/OnboardingReview';
import MiscForm from '@/components/server/forms/onboarding/MiscForm';
import NameForm from '@/components/server/forms/onboarding/NameForm';
import SocialForm from '@/components/server/forms/onboarding/SocialForm';
import { MiscFormData, NameFormData, SocialFormData } from '@/types/FormDataTypes';
import React from 'react';
import { create } from 'zustand';

type FormSections = 'name' | 'misc' | 'social'

export type FormData = {
  name?: NameFormData;
  misc?: MiscFormData;
  social?: SocialFormData;
};

type StepState = {
  currentStep: number;
  maxStep: number;
  formData: FormData;
  isFirstStep: boolean;
  isLastStep: boolean;
  setCurrentStep: (step: number) => void;
  updateFormData: <T extends FormSections>(section: T, data: FormData[T]) => void;
  getFormData: () => FormData;
  setFormData: (data: FormData) => void;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  steps: React.FC[];
};

export const useStepStore = create<StepState>((set) => {
  const forms = [
    NameForm,
    MiscForm,
    SocialForm,
    OnboardingReview
  ];

  const maxStep = forms.length - 1;

  const setCurrentStep = (step: number) => set({ currentStep: step });

  const next = () => {
    set((state) => {
      const newStep = state.currentStep < maxStep ? state.currentStep + 1 : state.currentStep;
      return {
        currentStep: newStep,
        isFirstStep: newStep === 0,
        isLastStep: newStep === maxStep
      };
    });
  };

  const back = () => {
    set((state) => {
      const newStep = state.currentStep > 0 ? state.currentStep - 1 : state.currentStep;
      return {
        currentStep: newStep,
        isFirstStep: newStep === 0,
        isLastStep: newStep === maxStep
      };
    });
  };

  const goTo = (step: number) => {
    if (step >= 0 && step <= maxStep) setCurrentStep(step);
  };

  const updateFormData = <T extends FormSections>(section: T, data: FormData[T]) => {
    set(state => ({
      formData: {
        ...state.formData,
        [section]: { ...(state.formData[section] || {}), ...data }
      }
    }));
  };

  const setFormData = (data: FormData) => {
    set(state => ({
      formData: {
        ...state.formData,
        ...data
      }
    }));
  };

  return {
    currentStep: 0,
    maxStep,
    formData: {},
    setCurrentStep,
    updateFormData,
    setFormData,
    next,
    back,
    goTo,
    isFirstStep: true,
    isLastStep: false,
    steps: forms
  };
});



