"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-white pt-24 pb-12 border-t border-black/5">
            <div className="container mx-auto px-6">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="md:col-span-1 space-y-6">
                        <Link href="/" className="text-4xl font-display font-bold tracking-tighter uppercase block">
                            KOKO
                        </Link>
                        <p className="text-muted-foreground">
                            Redefining the way you move. KOKO Walkers combines ethereal comfort with phantom-like aesthetic.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black hover:text-white">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black hover:text-white">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black hover:text-white">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black hover:text-white">
                                <Youtube className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold uppercase mb-6 tracking-wide">Products</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="/shop" className="hover:text-black transition-colors">Koko V1</Link></li>
                            <li><Link href="/shop" className="hover:text-black transition-colors">Phantom Elite</Link></li>
                            <li><Link href="/shop" className="hover:text-black transition-colors">Accessories</Link></li>
                            <li><Link href="/shop" className="hover:text-black transition-colors">Gift Cards</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase mb-6 tracking-wide">Support</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="#" className="hover:text-black transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Returns</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Sizing Guide</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold uppercase mb-6 tracking-wide">Stay in the loop</h4>
                        <p className="text-muted-foreground mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-[#F5F5F7] border-none rounded-lg px-4 py-2 w-full focus:outline-hidden focus:ring-2 focus:ring-black/5"
                            />
                            <Button className="rounded-lg bg-black text-white px-6">
                                →
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 text-sm text-muted-foreground">
                    <p>© 2026 KOKO Walkers. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-black">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
