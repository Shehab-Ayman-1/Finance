"use client";
import type { FormValues } from "../schema";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { Sheet, SheetContent } from "@/ui/sheet";
import { useEditModel } from "../hooks/useEditModel";
import { useDeleteAccount } from "../api/useDeleteAccount";
import { useEditAccount } from "../api/useEditAccount";
import { Header } from "./header";
import { Form } from "./form";

export const EditAccountSheet = () => {
    const { accountData, isOpen, onClose } = useEditModel();
    const { userId } = useAuth();

    const editMutation = useEditAccount();
    const deleteMutation = useDeleteAccount();

    const onSubmit = ({ name }: FormValues) => {
        if (!userId) return toast.error("Unauthorized");
        editMutation.mutate({ _id: accountData?.accountId, userId, name }, { onSuccess: onClose });
    };

    const onDelete = () => {
        if (!accountData?.accountId) return toast.warning("Account Was Not Deleted, Something Is Wrong.");
        deleteMutation.mutate([accountData.accountId]!, { onSuccess: onClose });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <Header title="Edit Account" description="Edit An Existing Account." />

                <Form
                    id={accountData?.accountId}
                    disabled={editMutation.isPending}
                    defaultValues={{ name: accountData?.name || "" }}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                />
            </SheetContent>
        </Sheet>
    );
};
