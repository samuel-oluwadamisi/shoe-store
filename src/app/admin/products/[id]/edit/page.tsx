import { updateProduct } from "@/app/actions/products";
import { ProductForm } from "@/components/admin/product-form";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import { toast } from "sonner";

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;
    await dbConnect();

    const product = await Product.findById(id);

    if (!product) {
        notFound();
    }

    // Serialize Mongoose document to plain object for client component
    const initialData = {
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description,
        images: product.images || [],
    };

    const handleSubmit = async (formData: FormData) => {
        "use server";
        const result = await updateProduct(id, formData);
        if (result?.error) {
            return { error: result.error };
        }
        // Success notification handled by redirect or parent
    };

    return (
        <ProductForm
            initialData={initialData}
            onSubmit={handleSubmit}
            submitLabel="Update Product"
            pageTitle="Edit Product"
        />
    );
}
