"use client";
import type { FormValues } from "../schema";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { Sheet, SheetContent } from "@/ui/sheet";
import { useCreateModel } from "../hooks/useCreateModel";
import { useCreateTransaction } from "../api/useCreateTransaction";
import { Header } from "./header";
import { Form } from "./form";

export const CreateTransactionSheet = () => {
    const { isOpen, onClose } = useCreateModel();
    const { isPending, mutate } = useCreateTransaction();
    const { userId } = useAuth();

    const onSubmit = ({ name }: FormValues) => {
        if (!userId) return toast.error("Unauthorized");
        // mutate({}, { onSuccess: onClose });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <Header title="New Transaction" description="Create A New Transaction To Organize Your Transactions." />
                {/* TODO: Transaction Form */}
            </SheetContent>
        </Sheet>
    );
};
