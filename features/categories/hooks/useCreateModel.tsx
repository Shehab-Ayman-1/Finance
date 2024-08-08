import { create } from "zustand";

type CreateModel = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCreateModel = create<CreateModel>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
