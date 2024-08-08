"use client";
import type { CategoryType } from "@/server/models";
import { Row } from "@tanstack/react-table";

import { DataTable } from "@/components/table";
import { Loading } from "@/components/loading";
import { columns } from "./table-columns";

import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useDeleteCategory } from "@/features/categories/api/useDeleteCategory";
import { useConfirm } from "@/hooks/useConfirm";
import { CardContent } from "@/ui/card";

type ContentProps = {};

export const Content = ({}: ContentProps) => {
    const { data: categories, isLoading } = useGetCategories();
    const { mutate } = useDeleteCategory();
    const [ConfirmDialog, confirm] = useConfirm("Are Your Sure?", "You Are About To Delete A Perform Bulk Delete.");

    if (isLoading) return <Loading />;

    const onDelete = async (rows: Row<CategoryType>[]) => {
        const ok = await confirm();
        if (!ok) return;

        const IDs = rows.map((row) => row.original._id!);
        mutate(IDs);
    };

    return (
        <CardContent>
            <ConfirmDialog />
            <DataTable columns={columns} data={categories || []} filterFor="name" onDelete={onDelete} />;
        </CardContent>
    );
};
