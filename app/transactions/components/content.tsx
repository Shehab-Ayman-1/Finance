"use client";
import type { TransactionType } from "@/server/models";
import { Row } from "@tanstack/react-table";

import { columns } from "./table-columns";
import { DataTable } from "@/components/table";
import { Loading } from "@/components/loading";

import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useDeleteTransaction } from "@/features/transactions/api/useDeleteTransaction";
import { useConfirm } from "@/hooks/useConfirm";
import { CardContent } from "@/ui/card";

type ContentProps = {};

export const Content = ({}: ContentProps) => {
    const { data: transactions, isLoading } = useGetTransactions();
    const { mutate } = useDeleteTransaction();
    const [ConfirmDialog, confirm] = useConfirm("Are Your Sure?", "You Are About To Delete A Perform Bulk Delete.");

    if (isLoading) return <Loading />;

    const onDelete = async (rows: Row<TransactionType>[]) => {
        const ok = await confirm();
        if (!ok) return;

        const IDs = rows.map((row) => row.original._id!);
        mutate(IDs);
    };

    return (
        <CardContent>
            <ConfirmDialog />
            <DataTable columns={columns} data={transactions || []} filterFor="notes" onDelete={onDelete} />;
        </CardContent>
    );
};
