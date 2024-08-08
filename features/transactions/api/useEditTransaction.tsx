import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { TransactionType } from "@/server/models";

type RequestType = TransactionType;

const editTransaction = async (body: TransactionType) => {
    try {
        const options = { method: "PUT", body: JSON.stringify(body) };
        const response = await fetch("/api/transactions", options);

        const data = await response.json();
        if (!response?.ok) throw new Error(data);

        return data;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

export const useEditTransaction = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<string, Error, RequestType>({
        mutationFn: editTransaction,
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
