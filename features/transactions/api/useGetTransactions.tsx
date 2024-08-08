"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type QueriesProps = {
    accountId: string;
    from: string;
    to: string;
};

const getTransactions = async ({ accountId, from, to }: QueriesProps) => {
    try {
        const response = await fetch(`/api/transactions?accountId=${accountId}&from=${from}&to=${to}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data);
        return data;
    } catch (error) {
        const reason = error as any;
        throw new Error(reason.message);
    }
};

export const useGetTransactions = () => {
    const params = useSearchParams();
    const accountId = params.get("accountId") || "";
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const query = useQuery({
        queryKey: ["categories"],
        queryFn: () => getTransactions({ accountId, from, to }),
    });
    return query;
};
