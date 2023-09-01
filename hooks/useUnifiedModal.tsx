import create from 'zustand';

type ModalType = 'sheet' | 'dialog';
type ModalContent = 'onboarding' | 'profileSummary' | 'none';

export interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  content: ModalContent;
  // eslint-disable-next-line no-unused-vars
  openModal: (type: ModalType, content: ModalContent) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: 'sheet',
  content: 'none',
  openModal: (type, content) => set({ isOpen: true, modalType: type, content }),
  closeModal: () => set({ isOpen: false, content: 'none' }),
}));
