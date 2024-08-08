import { create } from "zustand";

type Data = {
    transactionId?: string;
    name?: string;
};

type EditModel = {
    transactionData?: Data;
    isOpen: boolean;
    onOpen: (transactionData?: Data) => void;
    onClose: () => void;
};

export const useEditModel = create<EditModel>((set) => ({
    transactionData: undefined,
    isOpen: false,
    onOpen: (transactionData?: Data) => set({ isOpen: true, transactionData }),
    onClose: () => set({ isOpen: false, transactionData: undefined }),
}));
