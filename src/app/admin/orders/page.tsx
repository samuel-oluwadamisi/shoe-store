
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import OrdersClient from "./OrdersClient";
import { Order as OrderInterface } from "@/data/orders";

export default async function OrdersPage() {
    await dbConnect();

    // Fetch orders from MongoDB
    const ordersDocs = await Order.find({}).sort({ date: -1 });

    // Serialize to JSON
    const orders = JSON.parse(JSON.stringify(ordersDocs)) as OrderInterface[];

    return <OrdersClient initialOrders={orders} />;
}
