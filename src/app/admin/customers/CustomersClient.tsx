"use client";

import { useState, useMemo } from "react";
import { Customer } from "@/data/customers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Mail, ShoppingBag } from "lucide-react";

interface CustomersClientProps {
    initialCustomers: Customer[];
}

export default function CustomersClient({ initialCustomers }: CustomersClientProps) {
    const [customers] = useState<Customer[]>(initialCustomers);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter customers
    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) => {
            return (
                customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [customers, searchQuery]);

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
                    Customers
                </h1>
                <p className="text-muted-foreground mt-1">
                    View your customer base
                </p>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search customers..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Customers Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No customers found matching your search.
                        </CardContent>
                    </Card>
                ) : (
                    filteredCustomers.map((customer) => (
                        <CustomerCard key={customer.id} customer={customer} formatDate={formatDate} />
                    ))
                )}
            </div>
        </div>
    );
}

function CustomerCard({
    customer,
    formatDate,
}: {
    customer: Customer;
    formatDate: (date: string) => string;
}) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-base font-semibold">
                            {customer.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                        </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                            {customer.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Orders</p>
                        <p className="font-semibold flex items-center gap-1">
                            <ShoppingBag className="h-3.5 w-3.5" />
                            {customer.orderCount}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Total Spent</p>
                        <p className="font-semibold">₦{customer.totalSpent.toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                    <p>Customer since {formatDate(customer.joinDate)}</p>
                    {customer.lastOrderDate && (
                        <p>Last order: {formatDate(customer.lastOrderDate)}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
