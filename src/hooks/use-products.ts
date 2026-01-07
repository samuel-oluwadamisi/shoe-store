import { useQuery } from "@tanstack/react-query";
import { Product } from "@/data/products";

export function useProducts(initialData?: Product[]) {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetch("/api/products");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        initialData,
    });
}

export function useProduct(id: string, initialData?: Product) {
    return useQuery<Product>({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        enabled: !!id,
        initialData,
    });
}
