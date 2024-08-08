import { create } from "zustand";

type Data = {
    accountId?: string;
    name?: string;
};

type EditModel = {
    accountData?: Data;
    isOpen: boolean;
    onOpen: (accountData?: Data) => void;
    onClose: () => void;
};

export const useEditModel = create<EditModel>((set) => ({
    accountData: undefined,
    isOpen: false,
    onOpen: (accountData?: Data) => set({ isOpen: true, accountData: accountData }),
    onClose: () => set({ isOpen: false, accountData: undefined }),
}));
