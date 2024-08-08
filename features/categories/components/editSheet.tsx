"use client";
import type { FormValues } from "../schema";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { Sheet, SheetContent } from "@/ui/sheet";
import { useEditModel } from "../hooks/useEditModel";
import { useDeleteCategory } from "../api/useDeleteCategory";
import { useEditCategory } from "../api/useEditCategory";
import { Header } from "./header";
import { Form } from "./form";

export const EditCategorySheet = () => {
    const { categoryData, isOpen, onClose } = useEditModel();
    const { userId } = useAuth();

    const editMutation = useEditCategory();
    const deleteMutation = useDeleteCategory();

    const onSubmit = ({ name }: FormValues) => {
        if (!userId) return toast.error("Unauthorized");
        editMutation.mutate({ _id: categoryData?.categoryId, userId, name }, { onSuccess: onClose });
    };

    const onDelete = () => {
        if (!categoryData?.categoryId) return toast.warning("Category Was Not Deleted, Something Is Wrong.");
        deleteMutation.mutate([categoryData.categoryId]!, { onSuccess: onClose });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <Header title="Edit Category" description="Edit An Existing Category." />

                <Form
                    id={categoryData?.categoryId}
                    disabled={editMutation.isPending}
                    defaultValues={{ name: categoryData?.name || "" }}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                />
            </SheetContent>
        </Sheet>
    );
};
