
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import ProductsClient from "./ProductsClient";
import { Product as ProductInterface } from "@/data/products";

export default async function ProductsPage() {
    await dbConnect();

    // Fetch users from MongoDB
    const productsDocs = await Product.find({})
        .select("name price category stock status images")
        .sort({ createdAt: 1 })
        .lean();
    const products = productsDocs.map(doc => ({
        ...doc,
        id: (doc as any)._id.toString()
    })) as ProductInterface[];

    return <ProductsClient initialProducts={products} />;
}
