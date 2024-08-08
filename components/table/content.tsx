import { flexRender, type HeaderGroup, type RowModel } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";

type ContentProps<TData> = {
    headerGroups: HeaderGroup<TData>[];
    rowModel: RowModel<TData>;
    columnsLength: number;
};

export const Content = <TData,>({ headerGroups, rowModel, columnsLength }: ContentProps<TData>) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {headerGroups.map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const cell = flexRender(header.column.columnDef.header, header.getContext());
                                return <TableHead key={header.id}>{header.isPlaceholder ? null : cell}</TableHead>;
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {!!rowModel.rows?.length &&
                        rowModel.rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                    {!rowModel.rows?.length && (
                        <TableRow>
                            <TableCell colSpan={columnsLength} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
