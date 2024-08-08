import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "@/server/models";

import { toast } from "sonner";

type RequestType = CategoryType;

const editCategory = async (body: CategoryType) => {
    try {
        const options = { method: "PUT", body: JSON.stringify(body) };
        const response = await fetch("/api/categories", options);

        const data = await response.json();
        if (!response?.ok) throw new Error(data);

        return data;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

export const useEditCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<string, Error, RequestType>({
        mutationFn: editCategory,
        onSuccess: (message) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
