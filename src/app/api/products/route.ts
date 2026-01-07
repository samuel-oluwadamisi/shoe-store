import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    try {
        await dbConnect();
        const products = await Product.find({}).sort({ createdAt: 1 }).lean();

        // Normalize products (mapping _id to id)
        const normalizedProducts = products.map((doc: any) => ({
            ...doc,
            id: doc._id.toString(),
        }));

        return NextResponse.json(normalizedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
