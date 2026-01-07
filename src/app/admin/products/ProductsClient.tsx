"use client";

import { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/data/products"; // Keeping interface for now, or define new one
import { deleteProduct } from "@/app/actions/products";

const ITEMS_PER_PAGE = 5;

type StatusFilter = "all" | "in-stock" | "low-stock" | "out-of-stock";

interface ProductsClientProps {
    initialProducts: Product[]; // Use the existing interface or a compatible one
}

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
    const [products] = useState<Product[]>(initialProducts); // In real app, might want to re-fetch/update or use sync
    // Note: Since we are using initialProducts from server component which fetches fresh data on revalidation,
    // simple state initialization is 'okay' for this structure, though real-time updates would use a more complex setup.
    // For now, optimistic updates or router.refresh() (implied by revalidatePath in action) will handle it.

    // Actually, to reflect changes immediately without full page reload cycle being slow, we might want to optimistic update.
    // But since `revalidatePath` handles it for the Server Component, Next.js will re-render the Server Component and pass new props.
    // However, `useState(initialProducts)` only initializes ONCE.
    // If the parent Server Component re-renders and passes new `initialProducts`, this state WON'T update.
    // We should use `initialProducts` directly or sync state.
    // Let's use `initialProducts` directly for the main list, but we need filtering.
    // Better: use a `useEffect` to sync or just derive from props + local filter state.
    // Given the architecture, let's keep it simple: assume full page refresh/navigation on action completion.

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isPending, startTransition] = useTransition();

    // Filter and search products
    // We should filter 'initialProducts' (the prop) effectively, so updates flow through.
    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product) => {
            // Search filter
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter
            let matchesStatus = true;
            if (statusFilter === "in-stock") {
                matchesStatus = product.stock >= 10;
            } else if (statusFilter === "low-stock") {
                matchesStatus = product.stock > 0 && product.stock < 10;
            } else if (statusFilter === "out-of-stock") {
                matchesStatus = product.stock === 0;
            }

            return matchesSearch && matchesStatus;
        });
    }, [initialProducts, searchQuery, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset page when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (status: StatusFilter) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    const handleDelete = async (product: Product) => {
        if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

        startTransition(async () => {
            const result = await deleteProduct(product.id);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`"${product.name}" deleted successfully`);
                // The server action revalidates, causing the parent to re-render and pass new initialProducts.
            }
        });
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
        if (stock < 10) return { label: "Low Stock", variant: "secondary" as const };
        return { label: "In Stock", variant: "default" as const };
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">
                        Products
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your product inventory
                    </p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2">
                            {(["all", "in-stock", "low-stock", "out-of-stock"] as StatusFilter[]).map(
                                (status) => (
                                    <Button
                                        key={status}
                                        variant={statusFilter === status ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleStatusChange(status)}
                                        className="capitalize"
                                    >
                                        {status.replace("-", " ")}
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        All Products ({filteredProducts.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {paginatedProducts.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No products found matching your criteria.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="pb-3 font-medium text-muted-foreground">Product</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Category</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Price</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Stock</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Status</th>
                                        <th className="pb-3 font-medium text-muted-foreground text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedProducts.map((product) => {
                                        const stockStatus = getStockStatus(product.stock);
                                        return (
                                            <tr key={product.id} className="border-b last:border-0">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                                                            <Image
                                                                src={product.images?.[0] || "/placeholder.jpg"}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{product.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {product.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant="outline">{product.category}</Badge>
                                                </td>
                                                <td className="py-4 font-medium">
                                                    ₦{product.price.toLocaleString()}
                                                </td>
                                                <td className="py-4">
                                                    {product.stock} units
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant={stockStatus.variant}>
                                                        {stockStatus.label}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/admin/products/${product.id}/edit`}>
                                                            <Button variant="ghost" size="icon-sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon-sm"
                                                            onClick={() => handleDelete(product)}
                                                            disabled={isPending}
                                                            className="text-destructive hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                                {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
                                {filteredProducts.length} products
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <span className="text-sm px-2">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
