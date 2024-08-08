"use client";
import type { AccountType } from "@/server/models";
import { Row } from "@tanstack/react-table";

import { columns } from "./table-columns";
import { DataTable } from "@/components/table";
import { Loading } from "@/components/loading";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useDeleteAccount } from "@/features/accounts/api/useDeleteAccount";
import { useConfirm } from "@/hooks/useConfirm";
import { CardContent } from "@/ui/card";

type ContentProps = {};

export const Content = ({}: ContentProps) => {
    const { data: accounts, isLoading } = useGetAccounts();
    const { mutate } = useDeleteAccount();
    const [ConfirmDialog, confirm] = useConfirm("Are Your Sure?", "You Are About To Delete A Perform Bulk Delete.");

    if (isLoading) return <Loading />;

    const onDelete = async (rows: Row<AccountType>[]) => {
        const ok = await confirm();
        if (!ok) return;

        const IDs = rows.map((row) => row.original._id!);
        mutate(IDs);
    };

    return (
        <CardContent>
            <ConfirmDialog />
            <DataTable columns={columns} data={accounts || []} filterFor="name" onDelete={onDelete} />;
        </CardContent>
    );
};
