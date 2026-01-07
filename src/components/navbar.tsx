"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/shop" },
    { name: "Dashboard", href: "/admin" },
];

export function Navbar() {
    const { count } = useCart();
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-24 items-center justify-between px-6 md:px-12">
                {/* Left: Hamburger (Mobile Only) */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Menu">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetHeader className="mb-8">
                                <SheetTitle className="text-2xl font-display font-bold tracking-tighter uppercase text-left">
                                    KOKO
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6">
                                {NAV_LINKS.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={cn(
                                                "text-lg font-medium transition-colors",
                                                isActive ? "text-accent font-bold" : "text-foreground/80 hover:text-accent"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                                <hr className="border-border/40" />
                                <Button className="w-full rounded-xl bg-foreground text-background font-bold h-12">
                                    Pre-Order Now
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo */}
                <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
                    <Link href="/" className="text-3xl font-display font-bold tracking-tighter uppercase">
                        KOKO
                    </Link>
                </div>

                {/* Center: Navigation Links (Desktop Only) */}
                <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    isActive ? "text-foreground font-bold" : "text-foreground/60 hover:text-foreground"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <Button className="hidden sm:flex rounded-full bg-foreground text-background font-bold px-6 hover:bg-foreground/90 transition-colors">
                        Pre-Order
                    </Button>
                    <div className="w-px h-6 bg-border/40 mx-2 hidden sm:block"></div>
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" aria-label="Cart" className="relative hover:bg-transparent">
                            <div className="relative">
                                <ShoppingBag className="h-6 w-6" />
                                {count > 0 && (
                                    <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#C6A87C] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
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
