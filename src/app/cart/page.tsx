"use client";

import { Navbar } from "@/components/navbar";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { items, removeItem, total, count } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-display font-bold uppercase tracking-tighter mb-12">
                    Your Cart ({count})
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-[#F5F5F7] rounded-3xl">
                        <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
                        <p className="text-muted-foreground mb-8">Looks like you haven't added any KOKO Products yet.</p>
                        <Link href="/shop">
                            <Button size="lg" className="rounded-full">Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div key={item.cartId} className="flex gap-6 p-6 bg-white border border-border/40 rounded-2xl shadow-sm">
                                    <div className="relative w-24 h-24 bg-[#F5F5F7] rounded-xl overflow-hidden shrink-0">
                                        {item.images[0] && (
                                            <Image src={item.images[0]} alt={item.name} fill className="object-contain p-2" />
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold font-display uppercase tracking-wide">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">{item.category} | {item.selectedSize}</p>
                                            </div>
                                            <p className="font-bold">₦{item.price.toLocaleString()}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => removeItem(item.cartId)}
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" /> Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#F5F5F7] p-8 rounded-3xl sticky top-24">
                                <h3 className="text-xl font-bold mb-6 font-display uppercase">Order Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-bold">₦{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-bold">Free</span>
                                    </div>
                                    <div className="h-px bg-border/20 w-full my-4"></div>
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span>₦{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <Button className="w-full h-14 text-lg rounded-full font-bold shadow-xl shadow-primary/10">
                                        Checkout <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
