"use client";

/**
 * Admin Sidebar Component
 * 
 * Persistent sidebar navigation for the admin dashboard.
 * 
 * TODO: When authentication is implemented, this sidebar should only
 * be accessible to authenticated admin users.
 * Example: const { user, isAdmin } = useAuth();
 *          if (!isAdmin) redirect('/login');
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    ShoppingCart,
    Users,
    BarChart3,
    ArrowLeft,
} from "lucide-react";

const sidebarLinks = [
    {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Add Product",
        href: "/admin/products/new",
        icon: PlusCircle,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
            <div className="flex h-full flex-col">
                {/* Logo / Brand */}
                <div className="flex h-16 items-center border-b border-sidebar-border px-6">
                    <Link
                        href="/admin"
                        className="text-xl font-display font-bold tracking-tight text-sidebar-foreground"
                    >
                        KOKO Admin
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {sidebarLinks.map((link) => {
                        const isActive =
                            pathname === link.href ||
                            (link.href !== "/admin" && pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-sidebar-border p-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Store
                    </Link>
                </div>
            </div>
        </aside>
    );
}
