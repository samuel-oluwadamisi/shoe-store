"use client";

import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Star, Truck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

import { useProduct } from "@/hooks/use-products";

interface ProductDetailClientProps {
    initialProduct: Product;
}

export default function ProductDetailClient({ initialProduct }: ProductDetailClientProps) {
    const { data: product } = useProduct(initialProduct.id, initialProduct);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { addItem } = useCart();

    if (!product) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
                <div className="aspect-square relative bg-[#F5F5F7] rounded-3xl overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        {product.images?.[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={800}
                                height={800}
                                className="object-contain w-full h-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        ) : <div className="text-4xl">👟</div>}
                    </div>
                </div>
                {/* Thumbnails */}
                <div className="grid grid-cols-3 gap-4">
                    {product.images?.map((img, i) => (
                        <div key={i} className="aspect-square bg-[#F5F5F7] rounded-xl relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-black/10">
                            <Image src={img} alt={`${product.name} ${i}`} fill className="object-contain p-2" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col pt-4">
                <div className="mb-2 text-accent font-bold uppercase tracking-wider text-sm">
                    {product.category}
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-4">
                    {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold">₦{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">₦{product.originalPrice?.toLocaleString()}</span>
                    )}
                    <div className="ml-auto flex items-center text-yellow-500">
                        <Star className="fill-current w-4 h-4" />
                        <Star className="fill-current w-4 h-4" />
                        <Star className="fill-current w-4 h-4" />
                        <Star className="fill-current w-4 h-4" />
                        <Star className="fill-current w-4 h-4" />
                        <span className="ml-2 text-sm text-black ">(42 reviews)</span>
                    </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                    {product.description}
                </p>

                {/* Size Selector */}
                <div className="mb-8">
                    <div className="flex justify-between mb-4">
                        <span className="font-bold">Select Size</span>
                        <span className="text-muted-foreground underline text-sm cursor-pointer">Size Guide</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {product.sizes?.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`h-12 border rounded-lg flex items-center justify-center font-medium transition-all
                            ${selectedSize === size
                                        ? 'border-primary bg-primary text-primary-foreground scale-105'
                                        : 'border-input hover:border-primary/50'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        size="lg"
                        className="w-full text-lg h-14 rounded-full gap-3 shadow-xl shadow-primary/10"
                        disabled={!selectedSize}
                        onClick={() => {
                            if (selectedSize) {
                                addItem(product, selectedSize);
                                toast.success("Added to cart");
                            } else {
                                toast.error("Please select a size.");
                            }
                        }}
                    >
                        {selectedSize ? "Add to Bag" : "Select a Size"} <ShoppingBag className="w-5 h-5" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                        <Truck className="w-4 h-4" /> Free global shipping on all pre-orders
                    </p>
                </div>

                {/* Features */}
                <div className="mt-12 space-y-4 border-t pt-8">
                    <h3 className="font-bold font-display uppercase">Product Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {product.features?.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
