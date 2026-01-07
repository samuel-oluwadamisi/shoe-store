"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#F5F5F7] flex flex-col pt-24">

            <div className="container mx-auto px-6 relative flex-1 flex flex-col pt-20  min-h-[800px]">
                {/* Text Layer (Foreground/Overlay) */}
                <div className="relative z-20 text-center space-y-2 mt-[-100px] pointer-events-none">
                    <h1 className="font-display text-[15vw] leading-[0.85] font-bold tracking-tighter text-foreground uppercase mix-blend-difference text-black">
                        Ghost <br /> Walkers
                    </h1>
                    <h2 className="font-display text-[15vw] leading-[0.85] font-bold tracking-tighter text-[#C6A87C] uppercase opacity-90">
                        Pure Sole
                    </h2>
                </div>

                {/* Image Layer (Background/Middle) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-full max-w-[1200px] h-[120vh] z-10 opacity-100 pointer-events-none">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // smooth easeOutQuint
                        className="relative w-full h-full"
                    >
                        <Image
                            src="/shoe-1.png"
                            alt="Ghost Walker Shoe"
                            fill
                            className="object-contain" // Cover might clip, contain is safer for 'product'
                            priority
                        />
                    </motion.div>
                </div>

                {/* Floating elements / CTA */}
                <div className="absolute bottom-32 z-30 w-full flex justify-between items-end px-4 md:px-20 pointer-events-auto">
                    <div className="hidden md:block text-sm font-medium text-muted-foreground w-48">
                        Designed for the budget-conscious consumer who doesn't want to compromise on sound quality.
                    </div>

                    <Button
                        size="lg"
                        className="rounded-full bg-black text-white hover:bg-neutral-800 h-16 px-10 text-lg shadow-2xl"
                    >
                        Pre-Order Now
                    </Button>

                    <div className="hidden md:block text-sm font-medium text-right w-48">
                        <p>Ghost Walkers v1</p>
                        <p>₦75,000 Starting Price</p>
                    </div>
                </div>
            </div>

            {/* Horizontal Marquee Separator */}
            <div className="w-full bg-white py-8 border-y border-black/5 overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee">
                    {Array(6).fill("TRY NOW ⚪️ TRY NOW ⚪️ TRY NOW ⚪️ ").map((item, i) => (
                        <span key={i} className="text-4xl font-display font-bold uppercase tracking-widest mx-4 text-black/80">
                            {item}
                        </span>
                    ))}
                </div>
            </div>

        </section>
    );
}
