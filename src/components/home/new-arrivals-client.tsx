"use client";

import { ProductCard } from "@/components/shop/product-card";
import { Product } from "@/data/products";

interface NewArrivalsClientProps {
    initialProducts: Product[];
}

export function NewArrivalsClient({ initialProducts }: NewArrivalsClientProps) {
    // Show the products passed from the static data source
    const displayProducts = initialProducts;

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-accent">New Launches</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">Fresh off the boat</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayProducts.map((product, i) => (
                        <div key={product.id || i} className="bg-[#F5F5F7] rounded-3xl p-6 hover:shadow-lg transition-shadow">
                            <ProductCard product={product} />
                        </div>
                    ))}
                    {displayProducts.length === 0 && (
                        <div className="col-span-full py-10 text-center text-muted-foreground italic">
                            Coming soon...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
