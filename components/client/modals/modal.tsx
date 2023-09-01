import React from 'react';
import { useModalStore } from '../../../hooks/useUnifiedModal';
import NewOnboarding from './NewOnboarding';
import UnifiedModal from './UnifiedModal';

const Modal: React.FC = () => {
  const { isOpen, modalType, content, closeModal } = useModalStore();

  if (!isOpen) return null;

  const renderModalContent = () => {
    switch (content) {
      case 'onboarding':
        return <UnifiedModal modalType={modalType} title="Onboarding" buttonName="Start" content={<NewOnboarding />} isOpen={isOpen} closeModal={closeModal} />;
      case 'profileSummary':
        // Render another content here
        break;
      case 'none':
      default:
        return null;
    }
  }

  return (
    <div>
      {renderModalContent()}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default Modal;
