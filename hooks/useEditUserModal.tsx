import { create } from 'zustand';

interface EditUserModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const editUserModal = create<EditUserModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default editUserModal;
