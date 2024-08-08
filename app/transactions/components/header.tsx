"use client";
import { PlusIcon } from "lucide-react";

import { useCreateModel } from "@/features/transactions/hooks/useCreateModel";
import { CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    const { onOpen } = useCreateModel();

    return (
        <CardHeader className="sm:flex-between gap-y-2 sm:flex-row">
            <CardTitle className="line-clamp-1 text-xl font-bold">Transaction Page</CardTitle>
            <Button onClick={() => onOpen()}>
                <PlusIcon className="mr-2 size-4" />
                Add New
            </Button>
        </CardHeader>
    );
};
