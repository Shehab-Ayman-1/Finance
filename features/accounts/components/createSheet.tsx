"use client";
import type { FormValues } from "../schema";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { Sheet, SheetContent } from "@/ui/sheet";
import { useCreateModel } from "../hooks/useCreateModel";
import { useCreateAccount } from "../api/useCreateAccount";
import { Header } from "./header";
import { Form } from "./form";

export const CreateAccountSheet = () => {
    const { isOpen, onClose } = useCreateModel();
    const { isPending, mutate } = useCreateAccount();
    const { userId } = useAuth();

    const onSubmit = ({ name }: FormValues) => {
        if (!userId) return toast.error("Unauthorized");
        mutate({ userId, name }, { onSuccess: onClose });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <Header title="New Account" description="Create A New Account To Track Your Accounts." />
                <Form disabled={isPending} defaultValues={{ name: "" }} onSubmit={onSubmit} />
            </SheetContent>
        </Sheet>
    );
};
