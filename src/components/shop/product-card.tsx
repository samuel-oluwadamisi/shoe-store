"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col gap-4"
        >
            <Link href={`/shop/${product.id}`} className="block relative aspect-square overflow-hidden rounded-xl bg-[#F5F5F7]">
                <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500">
                    {/* Fallback pattern if image fails, but we have valid paths now */}
                    {product.images?.[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="object-contain w-full h-full drop-shadow-lg"
                        />
                    ) : (
                        <div className="text-4xl">👟</div>
                    )}
                </div>
                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        New
                    </span>
                )}
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <Link href={`/shop/${product.id}`}>
                        <h3 className="text-lg font-bold font-display uppercase tracking-wider hover:text-accent transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold">₦{product.price.toLocaleString()}</p>
                </div>
            </div>

            <Button
                className="w-full gap-2 rounded-full"
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    addItem(product, product.sizes[2] || "US 9");
                    toast.success(`${product.name} added to cart!`);
                }}
            >
                Add to Cart <ShoppingBag className="h-4 w-4" />
            </Button>
        </motion.div>
    );
}
