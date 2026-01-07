
import dbConnect from "@/lib/db";
import User from "@/models/User";
import CustomersClient from "./CustomersClient";
import { Customer as CustomerInterface } from "@/data/customers";

export default async function CustomersPage() {
    await dbConnect();

    // Fetch users from MongoDB
    const usersDocs = await User.find({}).sort({ totalSpent: -1 });

    // Serialize to JSON
    const customers = JSON.parse(JSON.stringify(usersDocs)) as CustomerInterface[];

    return <CustomersClient initialCustomers={customers} />;
}
