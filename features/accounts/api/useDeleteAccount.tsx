import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteAccount = async (IDs: string[]) => {
    try {
        const options = { method: "DELETE", body: JSON.stringify(IDs) };
        const response = await fetch(`/api/accounts`, options);

        const data = await response.json();
        if (!response.ok) throw new Error(data);

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteAccount,
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
