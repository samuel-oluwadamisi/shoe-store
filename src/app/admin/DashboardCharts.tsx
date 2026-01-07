"use client";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardChartsProps {
    ordersOverTime: any[];
    revenueByCategory: any[];
}

export function DashboardCharts({ ordersOverTime, revenueByCategory }: DashboardChartsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Orders Over Time Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Orders Over Time
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={ordersOverTime}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    className="stroke-muted"
                                />
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
                                    connectNulls
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Revenue by Category Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Revenue by Category
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueByCategory}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    className="stroke-muted"
                                />
                                <XAxis
                                    dataKey="category"
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
                                    formatter={(value) => [
                                        `₦${Number(value ?? 0).toLocaleString()}`,
                                        "Revenue",
                                    ]}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="#C6A87C"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
