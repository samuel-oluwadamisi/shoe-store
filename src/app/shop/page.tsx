import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import ShopClient from "./ShopClient";

export const revalidate = 120;

export default async function ShopPage() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: async () => {
            await dbConnect();
            const productsDocs = await Product.find({})
                .select("name price images category stock")
                .sort({ createdAt: 1 })
                .limit(50)
                .lean();

            return productsDocs.map((doc) => ({
                ...doc,
                id: doc._id.toString(),
            }));
        },
    });

    const products = queryClient.getQueryData(["products"]) as any[] || [];

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ShopClient initialProducts={products} />
        </HydrationBoundary>
    );
}
