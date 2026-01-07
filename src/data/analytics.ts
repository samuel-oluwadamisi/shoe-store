/**
 * Mock Analytics Data
 * 
 * Pre-computed analytics data for dashboard charts.
 * In a real application, this would be computed on the backend.
 * 
 * TODO: Replace with actual API calls when backend is implemented
 * Example: const analytics = await fetch('/api/analytics').then(res => res.json())
 */

// Orders over time (last 6 months)
export interface DailyOrderData {
    date: string;
    orders: number;
    revenue: number;
}

export const ordersOverTime: DailyOrderData[] = [
    { date: "Aug", orders: 15, revenue: 1050000 },
    { date: "Sep", orders: 22, revenue: 1625000 },
    { date: "Oct", orders: 30, revenue: 2225000 },
    { date: "Nov", orders: 45, revenue: 3125000 },
    { date: "Dec", orders: 65, revenue: 4550000 },
    { date: "Jan", orders: 58, revenue: 4100000 },
];

// Revenue by category
export interface CategoryRevenueData {
    category: string;
    revenue: number;
    orders: number;
}

export const revenueByCategory: CategoryRevenueData[] = [
    { category: "Streetwear", revenue: 443250, orders: 6 },
    { category: "Lifestyle", revenue: 260000, orders: 4 },
    { category: "Hybrid", revenue: 285000, orders: 4 },
];

// Monthly revenue trend (for extended analytics)
export interface MonthlyRevenueData {
    month: string;
    revenue: number;
    orders: number;
}

export const monthlyRevenue: MonthlyRevenueData[] = [
    { month: "Jul", revenue: 612500, orders: 8 },
    { month: "Aug", revenue: 800000, orders: 11 },
    { month: "Sep", revenue: 722500, orders: 10 },
    { month: "Oct", revenue: 912500, orders: 13 },
    { month: "Nov", revenue: 1050000, orders: 15 },
    { month: "Dec", revenue: 985250, orders: 12 },
];

// Order status distribution
export interface StatusDistribution {
    status: string;
    count: number;
    percentage: number;
    [key: string]: string | number;
}

export const orderStatusDistribution: StatusDistribution[] = [
    { status: "Delivered", count: 5, percentage: 42 },
    { status: "Shipped", count: 3, percentage: 25 },
    { status: "Processing", count: 2, percentage: 17 },
    { status: "Pending", count: 1, percentage: 8 },
    { status: "Cancelled", count: 1, percentage: 8 },
];

// Top selling products
export interface TopProduct {
    name: string;
    sales: number;
    revenue: number;
}

export const topSellingProducts: TopProduct[] = [
    { name: "Ghost Walkers", sales: 5, revenue: 375000 },
    { name: "Razorbill", sales: 3, revenue: 210000 },
    { name: "Zipper 2.0", sales: 4, revenue: 288000 },
    { name: "ES Brown", sales: 4, revenue: 260000 },
];

// Summary metrics
export interface DashboardMetrics {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    lowStockProducts: number;
    pendingOrders: number;
    totalCustomers: number;
}

export const getDashboardMetrics = (): DashboardMetrics => {
    return {
        totalProducts: 4,
        totalOrders: 12,
        totalRevenue: 985250,
        lowStockProducts: 1,
        pendingOrders: 1,
        totalCustomers: 10,
    };
};
