"use client";

/**
 * Analytics Page
 * 
 * Displays detailed analytics and charts.
 * 
 * TODO: When backend is implemented:
 * - Fetch real-time analytics data
 * - Add date range filters
 * 
 * Example: const analytics = await fetch('/api/admin/analytics').then(res => res.json());
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ordersOverTime,
    revenueByCategory,
    monthlyRevenue,
    orderStatusDistribution,
    topSellingProducts,
} from "@/data/analytics";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { AlertTriangle } from "lucide-react";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-display font-bold tracking-tight">
                    Analytics
                </h1>
                <p className="text-muted-foreground mt-1">
                    Detailed insights into your store performance
                </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <div className="text-amber-600 mt-0.5">
                    <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="font-semibold text-amber-900">Note</h4>
                    <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                        These charts use sample data so you can see the full trends right away, It makes for a much better demonstration of the data visualization.
                    </p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Orders Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Orders Trend (Last 6 Months)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={ordersOverTime}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="date"
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <YAxis
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e5e5e5",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                            zIndex: 100,
                                        }}
                                        wrapperStyle={{ zIndex: 100 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#1a1a1a"
                                        strokeWidth={2}
                                        dot={{ fill: "#1a1a1a", r: 4 }}
                                        activeDot={{ r: 6 }}
                                        name="Orders"
                                        connectNulls
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#C6A87C"
                                        strokeWidth={2}
                                        dot={{ fill: "#C6A87C", r: 4 }}
                                        activeDot={{ r: 6 }}
                                        name="Revenue ($)"
                                        connectNulls
                                    />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Revenue */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Monthly Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyRevenue}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="month"
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <YAxis
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e5e5e5",
                                            borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", zIndex: 100,
                                        }}
                                        wrapperStyle={{ zIndex: 100 }} formatter={(value) => [`₦${Number(value).toLocaleString()}`, "Revenue"]}
                                    />
                                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Status Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Order Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={orderStatusDistribution}
                                        dataKey="count"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                                    >
                                        {orderStatusDistribution.map((entry, index) => (
                                            <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e5e5e5",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                            zIndex: 100,
                                        }}
                                        wrapperStyle={{ zIndex: 100 }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Revenue by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Revenue by Category
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueByCategory} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        type="number"
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <YAxis
                                        dataKey="category"
                                        type="category"
                                        className="text-xs"
                                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        width={80}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e5e5e5",
                                            borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", zIndex: 100,
                                        }}
                                        wrapperStyle={{ zIndex: 100 }} formatter={(value) => [`$₦{Number(value).toLocaleString()}`, "Revenue"]}
                                    />
                                    <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Products */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Top Selling Products
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topSellingProducts.map((product, index) => (
                            <div
                                key={product.name}
                                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {product.sales} units sold
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold">₦{product.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
