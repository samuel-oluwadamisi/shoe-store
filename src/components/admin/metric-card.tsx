/**
 * Metric Card Component
 * 
 * Displays a single metric with title, value, and optional trend indicator.
 * Used for dashboard overview metrics.
 */

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export function MetricCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    className,
}: MetricCardProps) {
    return (
        <Card className={cn("relative overflow-hidden", className)}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <p className="text-3xl font-bold font-display tracking-tight">
                            {value}
                        </p>
                        {subtitle && (
                            <p className="text-xs text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                        {trend && (
                            <div
                                className={cn(
                                    "flex items-center gap-1 text-xs font-medium",
                                    trend.isPositive
                                        ? "text-green-600"
                                        : "text-red-600"
                                )}
                            >
                                {trend.isPositive ? (
                                    <TrendingUp className="h-3 w-3" />
                                ) : (
                                    <TrendingDown className="h-3 w-3" />
                                )}
                                {trend.isPositive ? "+" : ""}
                                {trend.value}% from last month
                            </div>
                        )}
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
