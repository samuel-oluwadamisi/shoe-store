"use client";

import { Footprints, ShieldCheck, Zap, Feather } from "lucide-react";
import Image from "next/image";

export function Features() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-sm font-bold uppercase tracking-widest text-[#C6A87C] mb-2 block">Features</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
                        Walk towards <br /> the future
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    {/* Left Column */}
                    <div className="space-y-12">
                        <div className="text-center md:text-right group">
                            <div className="mb-4 flex justify-center md:justify-end">
                                <div className="p-3 rounded-full bg-[#F5F5F7] group-hover:bg-black group-hover:text-white transition-colors">
                                    <Feather className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold uppercase mb-2">Ultra-Lightweight</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Engineered with phantom-knits that feel weightless on your feet, allowing you to move with Koko-like agility.
                            </p>
                        </div>
                        <div className="text-center md:text-right group">
                            <div className="mb-4 flex justify-center md:justify-end">
                                <div className="p-3 rounded-full bg-[#F5F5F7] group-hover:bg-black group-hover:text-white transition-colors">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold uppercase mb-2">Weather Resistant</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Built to endure. Premium coating ensures rain or unexpected splashes won't dampen your stride.
                            </p>
                        </div>
                    </div>

                    {/* Center Image */}
                    <div className="relative h-[400px] md:h-[600px] w-full">
                        <div className="absolute inset-0 bg-[#F5F5F7] rounded-full scale-90 -z-10"></div>
                        <Image
                            src="/shoe-1.png"
                            alt="Koko Features"
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-12">
                        <div className="text-center md:text-left group">
                            <div className="mb-4 flex justify-center md:justify-start">
                                <div className="p-3 w-fit rounded-full bg-[#F5F5F7] group-hover:bg-black group-hover:text-white transition-colors">
                                    <Zap className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold uppercase mb-2">Energy Return</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Our proprietary Koko-Sole technology returns energy with every step, keeping you moving forward effortlessly.
                            </p>
                        </div>
                        <div className="text-center md:text-left group">
                            <div className="mb-4 flex justify-center md:justify-start">
                                <div className="p-3 w-fit rounded-full bg-[#F5F5F7] group-hover:bg-black group-hover:text-white transition-colors">
                                    <Footprints className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold uppercase mb-2">Adaptive Fit</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Molds to your unique foot shape over time for a bespoke feel that rivals custom-made footwear.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
