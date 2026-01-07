"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const { count } = useCart();
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-24 items-center justify-between px-6 md:px-12">
                {/* Left: Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="text-3xl font-display font-bold tracking-tighter uppercase">
                        KOKO
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                    <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        About Us
                    </Link>
                    <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Products
                    </Link>
                    <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Dashboard
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <Button className="rounded-full bg-foreground text-background font-bold px-6 hover:bg-foreground/90 transition-colors">
                        Pre-Order
                    </Button>
                    <div className="w-px h-6 bg-border/40 mx-2 hidden sm:block"></div>
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" aria-label="Cart" className="relative hover:bg-transparent">
                            <div className="relative">
                                <ShoppingBag className="h-6 w-6" />
                                {count > 0 && (
                                    <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-accent border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                        {count > 99 ? "99+" : count}
                                    </span>
                                )}
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
