"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0">
                    {/* Simulating a brand background - in real app, use a real team/factory photo */}
                    <div className="w-full h-full bg-neutral-900 relative">
                        <Image src="/shoe-top.png" alt="Craftsmanship" fill className="object-cover opacity-50 blur-xs" />
                    </div>
                </div>
                <div className="relative z-20 text-center text-white px-6">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-6"
                    >
                        The Spirit of <br /> The Ghost
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto"
                    >
                        Crafting the future of footwear, one phantom step at a time.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-display font-bold uppercase tracking-wide">Our Story</h2>
                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                Born in a small design studio in 2024, KOKO Walkers emerged from a simple desire: to create footwear that feels as light as air but hits with heavy impact on style.
                            </p>
                            <p>
                                We were tired of the noise. The loud logos, the clunky silhouettes. We wanted silence. We wanted stealth. We wanted a shoe that spoke volumes without saying a word.
                            </p>
                            <p>
                                Every pair of KOKO Walkers is a testament to minimalist obsession. We strip away the unnecessary, leaving only pure form and function.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-square bg-[#F5F5F7] rounded-3xl overflow-hidden">
                        <Image src="/shoe-side.png" alt="Design Process" fill className="object-contain p-12 hover:scale-105 transition-transform duration-700" />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-[#0A0A0A] text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold uppercase text-[#C6A87C]">Custom Craft</h3>
                            <p className="text-white/70">
                                Hand-finished details on every pair. No two KOKO pairs are exactly alike.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold uppercase text-[#C6A87C]">Premium Materials</h3>
                            <p className="text-white/70">
                                Sourced from the finest etheeral fabrics and durable composites.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold uppercase text-[#C6A87C]">Design First</h3>
                            <p className="text-white/70">
                                We don't follow trends. We haunt them. Timeless aesthetic for the modern walker.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
