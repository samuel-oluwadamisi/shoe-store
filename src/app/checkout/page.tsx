"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import Link from "next/link";

export default function CheckoutPage() {
    const { total } = useCart();

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-display font-bold uppercase mb-8">Checkout</h1>

                    <div className="grid gap-8">
                        {/* Shipping Address */}
                        <div className="bg-[#F5F5F7] p-8 rounded-3xl">
                            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <input className="w-full p-3 rounded-lg border border-border bg-white" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <input className="w-full p-3 rounded-lg border border-border bg-white" placeholder="Doe" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <input className="w-full p-3 rounded-lg border border-border bg-white" placeholder="123 Ghost St" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">City</label>
                                    <input className="w-full p-3 rounded-lg border border-border bg-white" placeholder="New York" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">ZIP Code</label>
                                    <input className="w-full p-3 rounded-lg border border-border bg-white" placeholder="10001" />
                                </div>
                            </form>
                        </div>

                        {/* Payment */}
                        <div className="bg-[#F5F5F7] p-8 rounded-3xl">
                            <h2 className="text-xl font-bold mb-4">Payment</h2>
                            <div className="text-sm text-muted-foreground mb-4 bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg text-yellow-800 dark:text-yellow-200">
                                This is a prototype. No payment processing will occur.
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold mb-6">
                                <span>Total to Pay</span>
                                <span>₦{total.toLocaleString()}</span>
                            </div>
                            <Button size="lg" className="w-full h-14 text-lg rounded-full font-bold">
                                Pay ₦{total.toLocaleString()}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
