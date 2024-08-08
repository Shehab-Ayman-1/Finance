"use client";
import { EditIcon, MoreHorizontalIcon } from "lucide-react";
import { Fragment } from "react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/ui/dropdown-menu";
import { useDeleteTransaction } from "@/features/transactions/api/useDeleteTransaction";
import { useEditModel } from "@/features/transactions/hooks/useEditModel";
import { useConfirm } from "@/hooks/useConfirm";
import { Button } from "@/ui/button";

type ActionsProps = {
    _id: string;
    name: string;
};

export const Actions = ({ _id, name }: ActionsProps) => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Are You Sure?",
        "You Are About To Delete This Transaction, And unable To Undo It Again",
    );
    const { onOpen } = useEditModel();
    const { mutate, isPending } = useDeleteTransaction();

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) return mutate([_id]);
    };

    return (
        <Fragment>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={false}
                        onClick={() => onOpen({ transactionId: _id, name })}
                        className="cursor-pointer text-base font-medium"
                    >
                        <EditIcon className="mr-2 size-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={false}
                        onClick={onDelete}
                        className="cursor-pointer text-base font-medium text-rose-500 hover:bg-rose-50 hover:text-rose-900"
                    >
                        <EditIcon className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Fragment>
    );
};
