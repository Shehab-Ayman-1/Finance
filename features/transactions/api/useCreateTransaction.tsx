import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TransactionType } from "@/server/models";

import { toast } from "sonner";

type RequestType = TransactionType;

const createTransactions = async (body: TransactionType) => {
    try {
        const options = { method: "POST", body: JSON.stringify(body) };
        const response = await fetch("/api/transactions", options);

        const data = await response.json();
        if (!response?.ok) throw new Error(data);

        return data;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<string, Error, RequestType>({
        mutationFn: createTransactions,
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
