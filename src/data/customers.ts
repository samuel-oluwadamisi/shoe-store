/**
 * Mock Customers Data
 * 
 * This file contains mock customer data for the admin dashboard.
 * In a real application, this would be fetched from a backend API.
 * 
 * TODO: Replace with actual API calls when backend is implemented
 * Example: const customers = await fetch('/api/customers').then(res => res.json())
 */

export interface Customer {
    id: string;
    name: string;
    email: string;
    orderCount: number;
    totalSpent: number;
    joinDate: string; // ISO date string
    lastOrderDate: string | null;
}

// Generate dates
const getDateDaysAgo = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
};

export const customers: Customer[] = [
    {
        id: "CUST-001",
        name: "James Wilson",
        email: "james.wilson@email.com",
        orderCount: 2,
        totalSpent: 559,
        joinDate: getDateDaysAgo(45),
        lastOrderDate: getDateDaysAgo(2)
    },
    {
        id: "CUST-002",
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        orderCount: 2,
        totalSpent: 834,
        joinDate: getDateDaysAgo(60),
        lastOrderDate: getDateDaysAgo(3)
    },
    {
        id: "CUST-003",
        name: "Michael Brown",
        email: "michael.brown@email.com",
        orderCount: 1,
        totalSpent: 570,
        joinDate: getDateDaysAgo(30),
        lastOrderDate: getDateDaysAgo(1)
    },
    {
        id: "CUST-004",
        name: "Emily Davis",
        email: "emily.davis@email.com",
        orderCount: 1,
        totalSpent: 299,
        joinDate: getDateDaysAgo(15),
        lastOrderDate: getDateDaysAgo(0)
    },
    {
        id: "CUST-005",
        name: "David Kim",
        email: "david.kim@email.com",
        orderCount: 1,
        totalSpent: 275,
        joinDate: getDateDaysAgo(20),
        lastOrderDate: getDateDaysAgo(5)
    },
    {
        id: "CUST-006",
        name: "Lisa Thompson",
        email: "lisa.thompson@email.com",
        orderCount: 1,
        totalSpent: 584,
        joinDate: getDateDaysAgo(25),
        lastOrderDate: getDateDaysAgo(4)
    },
    {
        id: "CUST-007",
        name: "Robert Garcia",
        email: "robert.garcia@email.com",
        orderCount: 1,
        totalSpent: 0, // Order was cancelled
        joinDate: getDateDaysAgo(35),
        lastOrderDate: getDateDaysAgo(6)
    },
    {
        id: "CUST-008",
        name: "Jennifer Martinez",
        email: "jennifer.martinez@email.com",
        orderCount: 1,
        totalSpent: 299,
        joinDate: getDateDaysAgo(40),
        lastOrderDate: getDateDaysAgo(10)
    },
    {
        id: "CUST-009",
        name: "Daniel Lee",
        email: "daniel.lee@email.com",
        orderCount: 1,
        totalSpent: 520,
        joinDate: getDateDaysAgo(10),
        lastOrderDate: getDateDaysAgo(1)
    },
    {
        id: "CUST-010",
        name: "Amanda White",
        email: "amanda.white@email.com",
        orderCount: 1,
        totalSpent: 285,
        joinDate: getDateDaysAgo(8),
        lastOrderDate: getDateDaysAgo(3)
    }
];

// Helper function to get total customers
export const getTotalCustomers = (): number => {
    return customers.length;
};

// Helper function to get customers sorted by total spent
export const getTopCustomers = (limit: number = 5): Customer[] => {
    return [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, limit);
};
