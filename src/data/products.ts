
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    sizes: string[];
    category: string;
    features: string[];
    stock: number;
    isNew?: boolean;
    isPreOrder?: boolean;
}

export const products: Product[] = [
    {
        id: "ghost-walkers-v1",
        name: "Ghost Walkers",
        description: "Experience the ethereal comfort of the Ghost Walkers. Designed for those who tread lightly but make a heavy impact. Featuring our signature phantom-sole technology.",
        price: 75000,
        originalPrice: 85000,
        images: [
            "/shoe-1.png", // We will need to make sure these exist or use placeholders
            "/shoe-side.png",
            "/shoe-top.png"
        ],
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
        category: "Streetwear",
        features: [
            "Premium leather upper",
            "Ghost-sole technology",
            "Hand-stitched details",
            "Water-resistant coating"
        ],
        isNew: true,
        isPreOrder: true,
        stock: 25
    },
    {
        id: "zipper-2-0",
        name: "Zipper 2.0",
        description: "Iterated for perfection. The Zipper 2.0 features an innovative closure system and unique textures, making it a standout piece in any collection.",
        price: 72000,
        images: ["/products/zipper-2.0.jpg"],
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
        category: "Hybrid",
        features: [
            "Quick-zip closure",
            "Honeycomb texture panels",
            "Breathable inner lining",
            "Responsive cushioning"
        ],
        isNew: true,
        stock: 35
    },
    {
        id: "es-brown",
        name: "ES Brown",
        description: "The ES Brown redefines classic elegance with a rugged twist. Crafted for those who appreciate the finer details of craftsmanship and timeless style.",
        price: 65000,
        images: ["/products/es-brown.png"],
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        category: "Lifestyle",
        features: [
            "Premium leather upper",
            "Signature stitching",
            "Comfort-cushioned insole",
            "Durable rubber outsole"
        ],
        isNew: true,
        stock: 8
    },
    {
        id: "razorbill",
        name: "Razorbill",
        description: "Sharp, monochrome, and built for the urban edge. The Razorbill combines aggressive styling with all-day comfort for the modern explorer.",
        price: 70000,
        images: ["/products/razorbill.png"],
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
        category: "Streetwear",
        features: [
            "Contrast monochrome finish",
            "Reinforced sole unit",
            "High-grade synthetic leather",
            "Dynamic fit system"
        ],
        isNew: true,
        stock: 42
    }
];
