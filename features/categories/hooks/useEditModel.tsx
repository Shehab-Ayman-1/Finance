import { create } from "zustand";

type Data = {
    categoryId?: string;
    name?: string;
};

type EditModel = {
    categoryData?: Data;
    isOpen: boolean;
    onOpen: (categoryData?: Data) => void;
    onClose: () => void;
};

export const useEditModel = create<EditModel>((set) => ({
    categoryData: undefined,
    isOpen: false,
    onOpen: (categoryData?: Data) => set({ isOpen: true, categoryData }),
    onClose: () => set({ isOpen: false, categoryData: undefined }),
}));
