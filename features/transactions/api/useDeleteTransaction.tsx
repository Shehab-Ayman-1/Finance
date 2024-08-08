import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteTransaction = async (IDs: string[]) => {
    try {
        const options = { method: "DELETE", body: JSON.stringify(IDs) };
        const response = await fetch(`/api/transactions`, options);

        const data = await response.json();
        if (!response.ok) throw new Error(data);

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteTransaction,
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
