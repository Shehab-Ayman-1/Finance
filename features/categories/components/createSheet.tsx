"use client";
import type { FormValues } from "../schema";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { Sheet, SheetContent } from "@/ui/sheet";
import { useCreateModel } from "../hooks/useCreateModel";
import { useCreateCategory } from "../api/useCreateCategory";
import { Header } from "./header";
import { Form } from "./form";

export const CreateCategorySheet = () => {
    const { isOpen, onClose } = useCreateModel();
    const { isPending, mutate } = useCreateCategory();
    const { userId } = useAuth();

    const onSubmit = ({ name }: FormValues) => {
        if (!userId) return toast.error("Unauthorized");
        mutate({ userId, name }, { onSuccess: onClose });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <Header title="New Category" description="Create A New Category To Organize Your Transactions." />
                <Form disabled={isPending} defaultValues={{ name: "" }} onSubmit={onSubmit} />
            </SheetContent>
        </Sheet>
    );
};
