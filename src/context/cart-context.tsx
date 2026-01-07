"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

interface CartItem extends Product {
    cartId: string; // Unique ID for this instance in cart (to distinct same product/size)
    selectedSize: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, size: string) => void;
    removeItem: (cartId: string) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Hydration fix
    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem("cart");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                } else {
                    console.error("Cart data is not an array, resetting.");
                    setItems([]);
                }
            } catch (e) {
                console.error("Failed to parse cart", e);
                setItems([]);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (product: Product, size: string) => {
        setItems((prev) => {
            // Safety check
            if (!Array.isArray(prev)) return [];

            // ... rest of logic
            const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
            if (existing) {
                return prev.map((item) =>
                    item.cartId === existing.cartId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prev,
                {
                    ...product,
                    cartId: Math.random().toString(36).substring(7),
                    selectedSize: size,
                    quantity: 1,
                },
            ];
        });
    };

    const removeItem = (cartId: string) => {
        setItems((prev) => Array.isArray(prev) ? prev.filter((item) => item.cartId !== cartId) : []);
    };

    const clearCart = () => setItems([]);

    const total = Array.isArray(items) ? items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
    const count = Array.isArray(items) ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
