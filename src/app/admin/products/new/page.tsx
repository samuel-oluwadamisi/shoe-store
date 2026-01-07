"use client";

import { createProduct } from "@/app/actions/products";
import { ProductForm } from "@/components/admin/product-form";
import { toast } from "sonner";

export default function NewProductPage() {
    const handleSubmit = async (formData: FormData) => {
        const result = await createProduct(formData);
        if (result?.error) {
            return { error: result.error };
        }
        toast.success("Product created successfully!");
    };

    return (
        <ProductForm
            onSubmit={handleSubmit}
            submitLabel="Create Product"
            pageTitle="Add New Product"
        />
    );
}
