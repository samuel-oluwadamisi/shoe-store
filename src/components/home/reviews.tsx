"use client";

import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        author: "Lara Steiner",
        role: "Streetwear Enthusiast",
        content: "I've tried numerous sneakers over the years, but none have impressed me as much as these. The comfort is outstanding, with phantom-like weightlessness.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: 2,
        author: "Orlando Diggs",
        role: "Marathon Runner",
        content: "As an avid runner, I need shoes that stay in place and handle a bit of weather. These ghost walkers do just that and more. The IPX7 rating means I can run in the rain without a worry.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        id: 3,
        author: "Sarah Teller",
        role: "Tech Savvy Professional",
        content: "I've been using these for my daily commute and weekend hikes, and they're fantastic. The ergonomic fit is so comfortable that I sometimes forget I'm wearing them.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    },
    {
        id: 4,
        author: "Mike Johnson",
        role: "Urban Explorer",
        content: "The aesthetic is unmatched. I get compliments everywhere I go. Plus, the durability is surprising for something this stylish.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    },
    {
        id: 5,
        author: "Emily Davis",
        role: "Designer",
        content: "Finally, a shoe that understands modern design language. Minimalist yet functional. The ghost-sole technology is not just a gimmick.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026708d"
    },
    {
        id: 6,
        author: "Chris Lee",
        role: "Student",
        content: "Worth every penny. The unboxing experience alone was premium. Comfort right out of the box.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026709d"
    }
];

export function Reviews() {
    return (
        <section className="py-24 bg-[#0A0A0A] text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide">Product Reviews</h2>
                    <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                        We've sent our products to a couple of customers to test it and review it, here's their brutally honest review.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                            <div className="flex gap-1 mb-4 text-[#C6A87C]">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-white/80 leading-relaxed mb-8 min-h-[100px]">
                                "{review.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                    {/* Placeholder for avatar, or use intials if external image fails */}
                                    <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{review.author}</h4>
                                    <p className="text-xs text-white/50">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
