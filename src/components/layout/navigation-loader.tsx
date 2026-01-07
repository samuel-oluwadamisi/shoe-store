"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { KokoLoader } from "./koko-loader";

function NavigationHandler() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [pathname, searchParams, isLoading]);

    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (
                anchor &&
                anchor.href &&
                anchor.href.startsWith(window.location.origin) &&
                !anchor.hasAttribute("download") &&
                anchor.target !== "_blank"
            ) {
                // If it's an internal link, start the loader
                // Note: This won't capture router.push() calls from code, 
                // but it covers most user-initiated navigations.

                const currentUrl = window.location.href;
                const targetUrl = anchor.href;

                if (currentUrl !== targetUrl) {
                    setIsLoading(true);
                }
            }
        };

        window.addEventListener("click", handleAnchorClick);
        return () => window.removeEventListener("click", handleAnchorClick);
    }, []);

    return <KokoLoader isLoading={isLoading} />;
}

export function NavigationLoader() {
    return (
        <Suspense fallback={null}>
            <NavigationHandler />
        </Suspense>
    );
}
