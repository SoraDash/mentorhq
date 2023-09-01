import { useModalStore } from '../../../hooks/useUnifiedModal';

export const useUnifiedModal = () => {
  const { openModal } = useModalStore();
  return {
    openAsSheet: (content: any) => openModal('sheet', content),
    openAsDialog: (content: any) => openModal('dialog', content),
  };
};
