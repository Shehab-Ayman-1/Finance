import type { Column } from "@tanstack/react-table";
import { Input } from "@/ui/input";

type FilterProps<TData> = {
    getColumn: (columnId: string) => Column<TData, unknown> | undefined;
    filterFor: string;
};

export const Filter = <TData,>({ getColumn, filterFor }: FilterProps<TData>) => {
    return (
        <Input
            placeholder="Filter emails..."
            value={(getColumn(filterFor)?.getFilterValue() as string) ?? ""}
            onChange={(event) => getColumn(filterFor)?.setFilterValue(event.target.value)}
            className="max-w-sm"
        />
    );
};
