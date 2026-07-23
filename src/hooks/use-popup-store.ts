import { create } from 'zustand';

interface PopupState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
