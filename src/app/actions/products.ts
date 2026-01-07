"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function createProduct(formData: FormData) {
    try {
        console.log("Starting createProduct server action...");
        await dbConnect();
        console.log("DB connected.");

        const name = formData.get("name") as string;
        const price = Number(formData.get("price"));
        const category = formData.get("category") as string;
        const stock = Number(formData.get("stock"));
        const description = formData.get("description") as string;
        const imageUrl = formData.get("imageUrl") as string | null;

        console.log("Form data parsed:", { name, price, category, stock, hasImage: !!imageUrl });

        // Validation (handles 0 values correctly)
        if (!name || isNaN(price) || !category || isNaN(stock) || !description) {
            console.log("Validation failed.");
            return { error: "Missing or invalid required fields" };
        }

        const images = imageUrl ? [imageUrl] : ["/placeholder.jpg"];

        // Explicitly generate ID to satisfy Mongo/Mongoose required constraint on string IDs
        const _id = new mongoose.Types.ObjectId().toHexString();
        console.log("Generated ID:", _id);

        const newProduct = await Product.create({
            _id,
            name,
            price,
            category,
            stock,
            description,
            images,
            sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
            features: ["Premium materials", "Comfort fit"],
            isNewItem: true, // Renamed from isNewProduct to match schema
        });

        console.log("Product created successfully:", newProduct._id);

        // Comprehensive revalidation
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath("/");
    } catch (error: any) {
        console.error("CRITICAL ERROR in createProduct:", error);
        // Return a structured error object that the client can handle
        return { error: error.message || "Failed to create product" };
    }

    // Redirect only happens on SUCCESS and OUTSIDE try-catch
    console.log("Redirecting to /admin/products...");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    try {
        await dbConnect();
        await Product.findByIdAndDelete(id);
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete product:", error);
        return { error: error.message || "Failed to delete product" };
    }
}

export async function updateProduct(id: string, formData: FormData) {
    try {
        await dbConnect();

        const name = formData.get("name") as string;
        const price = Number(formData.get("price"));
        const category = formData.get("category") as string;
        const stock = Number(formData.get("stock"));
        const description = formData.get("description") as string;
        const imageUrl = formData.get("imageUrl") as string | null;

        if (!name || isNaN(price) || !category || isNaN(stock) || !description) {
            return { error: "Missing or invalid required fields" };
        }

        const updateData: Record<string, unknown> = {
            name,
            price,
            category,
            stock,
            description,
        };

        if (imageUrl) {
            updateData.images = [imageUrl];
        }

        await Product.findByIdAndUpdate(id, updateData, { new: true });

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath(`/shop/${id}`);
        revalidatePath("/");
    } catch (error: any) {
        console.error("Failed to update product:", error);
        return { error: error.message || "Failed to update product" };
    }

    redirect("/admin/products");
}
