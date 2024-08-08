"use client";
import { useState } from "react";

import { ColumnDef, getFilteredRowModel, Row, useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { SortingState, getSortedRowModel } from "@tanstack/react-table";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Button } from "@/ui/button";
import { Filter } from "./filter";
import { Content } from "./content";
import { Selected } from "./selected";
import { Controllers } from "./controllers";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterFor: string;
    disabled?: boolean;
    onDelete: (rows: Row<TData>[]) => void;
};

export const DataTable = <TData, TValue>({ columns, data, filterFor, disabled, onDelete }: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,

        // Rows
        columns,
        getCoreRowModel: getCoreRowModel(),

        // Pagination
        getPaginationRowModel: getPaginationRowModel(),

        // Sorting
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        // Filtering
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        // Select
        onRowSelectionChange: setRowSelection,

        // States
        state: { sorting, columnFilters, rowSelection },
    });

    const { getHeaderGroups, getRowModel, getColumn } = table;
    const { previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;

    const headerGroups = getHeaderGroups();
    const rowModel = getRowModel();

    const selectedRowsLength = table.getFilteredSelectedRowModel().rows.length;
    const totalRowsLength = table.getFilteredRowModel().rows.length;

    const handleDelete = () => {
        const rows = table.getFilteredSelectedRowModel().rows;
        onDelete(rows);
        table.resetRowSelection();
    };

    return (
        <Card className="border-none">
            <CardHeader className="flex-between flex-row px-0 py-4">
                <Filter getColumn={getColumn} filterFor={filterFor} />
                {!!selectedRowsLength && (
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className="peer text-xs hover:bg-rose-100/50"
                        onClick={handleDelete}
                    >
                        <Trash2Icon className="mr-2 size-4" />
                        Delete ({selectedRowsLength})
                    </Button>
                )}
            </CardHeader>

            <CardContent className="p-0">
                <Content headerGroups={headerGroups} rowModel={rowModel} columnsLength={columns.length} />
            </CardContent>

            <CardFooter className="flex-between gap-4 p-4">
                <Controllers
                    previousPage={previousPage}
                    nextPage={nextPage}
                    getCanNextPage={getCanNextPage}
                    getCanPreviousPage={getCanPreviousPage}
                />

                <Selected totalLength={totalRowsLength} selectedLength={selectedRowsLength} />
            </CardFooter>
        </Card>
    );
};
