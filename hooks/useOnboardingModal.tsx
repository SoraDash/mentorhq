import { create } from 'zustand';

interface OnBoardingModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const onboardingModal = create<OnBoardingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
export default onboardingModal;