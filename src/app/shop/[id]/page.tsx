import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { Navbar } from "@/components/navbar";
import ProductDetailClient from "@/app/shop/[id]/ProductDetailClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600; // 1 hour

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            await dbConnect();
            const productDoc = await Product.findById(id).lean();
            if (!productDoc) return null;

            return {
                ...productDoc,
                id: (productDoc as any)._id.toString(),
            };
        },
    });

    const product = queryClient.getQueryData(["product", id]);

    if (!product) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="container mx-auto py-20 text-center">
                    <h1 className="text-2xl font-bold font-display">
                        Product not found
                    </h1>
                    <Link
                        href="/shop"
                        className="text-primary underline mt-4 block"
                    >
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                <Link
                    href="/shop"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shop
                </Link>

                <HydrationBoundary state={dehydrate(queryClient)}>
                    <ProductDetailClient initialProduct={product as any} />
                </HydrationBoundary>
            </div>
        </main>
    );
}
