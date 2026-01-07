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
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";

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

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-sidebar">
            {/* Logo / Brand */}
            <div className="flex h-16 items-center border-b border-sidebar-border px-6">
                <Link
                    href="/admin"
                    className="text-xl font-display font-bold tracking-tight text-sidebar-foreground uppercase"
                >
                    Ghost Admin
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
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
                                    ? "bg-primary text-primary-foreground shadow-sm"
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
                    className="flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Store
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <div className="fixed top-4 left-4 z-50 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-background shadow-md">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-none w-64">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Admin Navigation</SheetTitle>
                            <SheetDescription>Access different sections of the admin dashboard</SheetDescription>
                        </SheetHeader>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 z-40 hidden lg:block h-screen w-64 border-r border-sidebar-border shadow-sm">
                <SidebarContent />
            </aside>
        </>
    );
}
