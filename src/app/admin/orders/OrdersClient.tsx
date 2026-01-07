"use client";

import { useState, useMemo } from "react";
import { Order, OrderStatus } from "@/data/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search,
    Eye,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

const statusColors: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    shipped: "bg-purple-100 text-purple-800 border-purple-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
};

interface OrdersClientProps {
    initialOrders: Order[];
}

export default function OrdersClient({ initialOrders }: OrdersClientProps) {
    // In a real app, you might sync this with server state or use router refresh
    const [orders] = useState<Order[]>(initialOrders);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Filter orders
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === "all" || order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, searchQuery, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (status: OrderStatus | "all") => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-display font-bold tracking-tight">
                    Orders
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage and track customer orders
                </p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search orders..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2 flex-wrap">
                            {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map(
                                (status) => (
                                    <Button
                                        key={status}
                                        variant={statusFilter === status ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleStatusChange(status)}
                                        className="capitalize"
                                    >
                                        {status}
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        All Orders ({filteredOrders.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {paginatedOrders.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No orders found matching your criteria.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="pb-3 font-medium text-muted-foreground">Order ID</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Status</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Total</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Date</th>
                                        <th className="pb-3 font-medium text-muted-foreground text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedOrders.map((order) => (
                                        <tr key={order.id} className="border-b last:border-0">
                                            <td className="py-4 font-mono text-sm font-medium">
                                                {order.id}
                                            </td>
                                            <td className="py-4">
                                                <div>
                                                    <p className="font-medium">{order.customerName}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {order.customerEmail}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <Badge
                                                    className={`capitalize ${statusColors[order.status]}`}
                                                    variant="outline"
                                                >
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td className="py-4 font-medium">
                                                ₦{order.total.toLocaleString()}
                                            </td>
                                            <td className="py-4 text-muted-foreground">
                                                {formatDate(order.date)}
                                            </td>
                                            <td className="py-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedOrder(order)}
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                                {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
                                {filteredOrders.length} orders
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

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold">
                                    Order {selectedOrder.id}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {formatDate(selectedOrder.date)}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => setSelectedOrder(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Status */}
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                                <Badge
                                    className={`capitalize ${statusColors[selectedOrder.status]}`}
                                    variant="outline"
                                >
                                    {selectedOrder.status}
                                </Badge>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Customer</p>
                                <p className="font-medium">{selectedOrder.customerName}</p>
                                <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Shipping Address</p>
                                <p className="text-sm">{selectedOrder.shippingAddress}</p>
                            </div>

                            {/* Order Items */}
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
                                <div className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-2 border-b last:border-0"
                                        >
                                            <div>
                                                <p className="font-medium">{item.productName}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Size: {item.size} × {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pt-4 border-t">
                                <p className="font-semibold">Total</p>
                                <p className="text-xl font-bold">₦{selectedOrder.total.toLocaleString()}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setSelectedOrder(null)}
                                >
                                    Close
                                </Button>
                                {/* TODO: Add update status functionality */}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
