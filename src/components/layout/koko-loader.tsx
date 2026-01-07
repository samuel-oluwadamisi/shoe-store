"use client";

import { motion, AnimatePresence } from "framer-motion";

interface KokoLoaderProps {
    isLoading: boolean;
}

export function KokoLoader({ isLoading }: KokoLoaderProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-md"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: [0.8, 1.1, 1],
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                            className="text-6xl font-display font-bold uppercase tracking-tighter"
                        >
                            koko
                        </motion.h1>
                        <div className="w-24 h-1 bg-muted overflow-hidden rounded-full">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-full h-full bg-primary"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
