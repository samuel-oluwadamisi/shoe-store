/**
 * Mock Orders Data
 * 
 * This file contains mock order data for the admin dashboard.
 * In a real application, this would be fetched from a backend API.
 * 
 * TODO: Replace with actual API calls when backend is implemented
 * Example: const orders = await fetch('/api/orders').then(res => res.json())
 */

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    size: string;
}

export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    items: OrderItem[];
    status: OrderStatus;
    total: number;
    date: string; // ISO date string
    shippingAddress: string;
}

// Generate dates for the past 30 days
const getDateDaysAgo = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
};

export const orders: Order[] = [
    {
        id: "ORD-001",
        customerId: "CUST-001",
        customerName: "James Wilson",
        customerEmail: "james.wilson@email.com",
        items: [
            { productId: "ghost-walkers-v1", productName: "Ghost Walkers", quantity: 1, price: 75000, size: "US 10" }
        ],
        status: "delivered",
        total: 75000,
        date: getDateDaysAgo(2),
        shippingAddress: "123 Main St, New York, NY 10001"
    },
    {
        id: "ORD-002",
        customerId: "CUST-002",
        customerName: "Sarah Chen",
        customerEmail: "sarah.chen@email.com",
        items: [
            { productId: "razorbill", productName: "Razorbill", quantity: 1, price: 70000, size: "US 8" },
            { productId: "es-brown", productName: "ES Brown", quantity: 1, price: 65000, size: "US 8" }
        ],
        status: "shipped",
        total: 135000,
        date: getDateDaysAgo(3),
        shippingAddress: "456 Oak Ave, Los Angeles, CA 90001"
    },
    {
        id: "ORD-003",
        customerId: "CUST-003",
        customerName: "Michael Brown",
        customerEmail: "michael.brown@email.com",
        items: [
            { productId: "zipper-2-0", productName: "Zipper 2.0", quantity: 2, price: 72000, size: "US 11" }
        ],
        status: "processing",
        total: 144000,
        date: getDateDaysAgo(1),
        shippingAddress: "789 Pine Rd, Chicago, IL 60601"
    },
    {
        id: "ORD-004",
        customerId: "CUST-004",
        customerName: "Emily Davis",
        customerEmail: "emily.davis@email.com",
        items: [
            { productId: "ghost-walkers-v1", productName: "Ghost Walkers", quantity: 1, price: 75000, size: "US 9" }
        ],
        status: "pending",
        total: 75000,
        date: getDateDaysAgo(0),
        shippingAddress: "321 Elm St, Houston, TX 77001"
    },
    {
        id: "ORD-005",
        customerId: "CUST-005",
        customerName: "David Kim",
        customerEmail: "david.kim@email.com",
        items: [
            { productId: "razorbill", productName: "Razorbill", quantity: 1, price: 70000, size: "US 10" }
        ],
        status: "delivered",
        total: 70000,
        date: getDateDaysAgo(5),
        shippingAddress: "654 Maple Dr, Phoenix, AZ 85001"
    },
    {
        id: "ORD-006",
        customerId: "CUST-001",
        customerName: "James Wilson",
        customerEmail: "james.wilson@email.com",
        items: [
            { productId: "es-brown", productName: "ES Brown", quantity: 1, price: 65000, size: "US 10" }
        ],
        status: "delivered",
        total: 65000,
        date: getDateDaysAgo(8),
        shippingAddress: "123 Main St, New York, NY 10001"
    },
    {
        id: "ORD-007",
        customerId: "CUST-006",
        customerName: "Lisa Thompson",
        customerEmail: "lisa.thompson@email.com",
        items: [
            { productId: "zipper-2-0", productName: "Zipper 2.0", quantity: 1, price: 72000, size: "US 9" },
            { productId: "ghost-walkers-v1", productName: "Ghost Walkers", quantity: 1, price: 75000, size: "US 9" }
        ],
        status: "shipped",
        total: 147000,
        date: getDateDaysAgo(4),
        shippingAddress: "987 Cedar Ln, Philadelphia, PA 19101"
    },
    {
        id: "ORD-008",
        customerId: "CUST-007",
        customerName: "Robert Garcia",
        customerEmail: "robert.garcia@email.com",
        items: [
            { productId: "razorbill", productName: "Razorbill", quantity: 1, price: 70000, size: "US 12" }
        ],
        status: "cancelled",
        total: 70000,
        date: getDateDaysAgo(6),
        shippingAddress: "147 Birch St, San Antonio, TX 78201"
    },
    {
        id: "ORD-009",
        customerId: "CUST-008",
        customerName: "Jennifer Martinez",
        customerEmail: "jennifer.martinez@email.com",
        items: [
            { productId: "ghost-walkers-v1", productName: "Ghost Walkers", quantity: 1, price: 75000, size: "US 7" }
        ],
        status: "delivered",
        total: 75000,
        date: getDateDaysAgo(10),
        shippingAddress: "258 Walnut Ave, San Diego, CA 92101"
    },
    {
        id: "ORD-010",
        customerId: "CUST-009",
        customerName: "Daniel Lee",
        customerEmail: "daniel.lee@email.com",
        items: [
            { productId: "es-brown", productName: "ES Brown", quantity: 2, price: 65000, size: "US 11" }
        ],
        status: "processing",
        total: 130000,
        date: getDateDaysAgo(1),
        shippingAddress: "369 Spruce Blvd, Dallas, TX 75201"
    },
    {
        id: "ORD-011",
        customerId: "CUST-010",
        customerName: "Amanda White",
        customerEmail: "amanda.white@email.com",
        items: [
            { productId: "zipper-2-0", productName: "Zipper 2.0", quantity: 1, price: 72000, size: "US 8" }
        ],
        status: "shipped",
        total: 72000,
        date: getDateDaysAgo(3),
        shippingAddress: "741 Ash Ct, San Jose, CA 95101"
    },
    {
        id: "ORD-012",
        customerId: "CUST-002",
        customerName: "Sarah Chen",
        customerEmail: "sarah.chen@email.com",
        items: [
            { productId: "ghost-walkers-v1", productName: "Ghost Walkers", quantity: 1, price: 75000, size: "US 8" }
        ],
        status: "delivered",
        total: 75000,
        date: getDateDaysAgo(12),
        shippingAddress: "456 Oak Ave, Los Angeles, CA 90001"
    }
];

// Helper function to get orders by status
export const getOrdersByStatus = (status: OrderStatus): Order[] => {
    return orders.filter(order => order.status === status);
};

// Helper function to get total revenue
export const getTotalRevenue = (): number => {
    return orders
        .filter(order => order.status !== "cancelled")
        .reduce((sum, order) => sum + order.total, 0);
};
