"use client";
import { ColumnDef, Column } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

import { TransactionType } from "@/server/models";
import { Checkbox } from "@/ui/checkbox";
import { Button } from "@/ui/button";
import { Actions } from "./table-actions";

const HeaderComponent = <T,>({ column }: { column: Column<T, unknown> }) => {
    const isAsc = column.getIsSorted() === "asc";
    const name = column.id.toUpperCase();
    return (
        <Button variant="ghost" className="p-0 text-base font-bold text-black" onClick={() => column.toggleSorting(isAsc)}>
            {name}
            <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
    );
};

export const columns: ColumnDef<TransactionType>[] = [
    {
        id: "select",
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "notes",
        header: HeaderComponent,
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions _id={row.original._id!} name={row.original.notes} />,
    },
];
