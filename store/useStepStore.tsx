import { CustomFormData, MiscFormData, NameFormData, SocialFormData } from '@/types/FormDataTypes';
import { create } from 'zustand';

type FormSections = 'name' | 'misc' | 'social' | 'custom';

type FormData = {
  name?: NameFormData;
  misc?: MiscFormData;
  social?: SocialFormData;
  custom?: CustomFormData;
};

type StepState = {
  currentStep: number;
  formData: FormData;
  setCurrentStep: (step: number) => void;
  updateFormData: <T extends FormSections>(section: T, data: FormData[T]) => void;
  getFormData: () => FormData;
  setFormData: (data: FormData) => void;
};

export const useStepStore = create<StepState>((set) => ({
  currentStep: 0,
  formData: {},
  setCurrentStep: (step: number) => set({ currentStep: step }),
  updateFormData: (section, data) => set((state) => ({
    formData: {
      ...state.formData,
      [section]: { ...(state.formData[section] || {}), ...data }
    }
  })),
  getFormData: () => (state: StepState) => state.formData,
  setFormData: (data) => set({ formData: data }),
}));
