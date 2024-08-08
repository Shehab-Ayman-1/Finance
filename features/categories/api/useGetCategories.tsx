import { useQuery } from "@tanstack/react-query";

const getCategories = async () => {
    try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        if (!response.ok) throw new Error(data);
        return data;
    } catch (error) {
        const reason = error as any;
        throw new Error(reason.message);
    }
};

export const useGetCategories = () => {
    const query = useQuery({ queryKey: ["categories"], queryFn: getCategories });
    return query;
};
