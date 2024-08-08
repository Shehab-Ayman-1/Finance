import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AccountType } from "@/server/models";

import { toast } from "sonner";

type RequestType = AccountType;

const editAccount = async (body: AccountType) => {
    try {
        const options = { method: "PUT", body: JSON.stringify(body) };
        const response = await fetch("/api/accounts", options);

        const data = await response.json();
        if (!response?.ok) throw new Error(data);

        return data;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

export const useEditAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<string, Error, RequestType>({
        mutationFn: editAccount,
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
