"use client";
import type { FormValues } from "../schema";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { Sheet, SheetContent } from "@/ui/sheet";
import { useEditModel } from "../hooks/useEditModel";
import { useDeleteTransaction } from "../api/useDeleteTransaction";
import { useEditTransaction } from "../api/useEditTransaction";
import { Header } from "./header";
import { Form } from "./form";

export const EditTransactionSheet = () => {
    const { transactionData, isOpen, onClose } = useEditModel();
    const { userId } = useAuth();

    const editMutation = useEditTransaction();
    const deleteMutation = useDeleteTransaction();

    const onSubmit = ({ name }: FormValues) => {
        if (!userId) return toast.error("Unauthorized");
        editMutation.mutate({ _id: transactionData?.transactionId, userId, name }, { onSuccess: onClose });
    };

    const onDelete = () => {
        if (!transactionData?.transactionId) return toast.warning("Transaction Was Not Deleted, Something Is Wrong.");
        deleteMutation.mutate([transactionData.transactionId]!, { onSuccess: onClose });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <Header title="Edit Transaction" description="Edit An Existing Transaction." />

                <Form
                    id={transactionData?.transactionId}
                    disabled={editMutation.isPending}
                    defaultValues={{ name: transactionData?.name || "" }}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                />
            </SheetContent>
        </Sheet>
    );
};
