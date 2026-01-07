"use client";

import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/shop/product-card";
import { Navbar } from "@/components/navbar";
import { Product } from "@/data/products";

interface ShopClientProps {
    initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
    const { data: products, error } = useProducts(initialProducts);

    if (error) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-6 py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="text-muted-foreground mb-8">Failed to load products. Please try again later.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col gap-2 mb-12">
                    <h1 className="text-5xl font-display font-bold uppercase tracking-tighter">
                        All Products
                    </h1>
                    <p className="text-muted-foreground w-full max-w-md">
                        Explore our latest collection of premium custom footwear.
                        Designed for comfort, engineered for style.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {products?.length === 0 && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl">
                            <p className="text-muted-foreground">No products found. Add some from the admin dashboard!</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
