import { loadEnvConfig } from '@next/env';
import path from 'path';

loadEnvConfig(process.cwd());

console.log('MONGODB_URI is set:', !!process.env.MONGODB_URI);

import mongoose from 'mongoose';
import dbConnect from '../lib/db';
import Product from '../models/Product';
import Order from '../models/Order';
import User from '../models/User';
import { products } from '../data/products';
import { orders } from '../data/orders';
import { customers } from '../data/customers';

// Force string IDs for seeding
const mappedProducts = products.map(p => {
    const { isNew, ...rest } = p;
    return { ...rest, isNewItem: isNew, _id: p.id };
});
const mappedOrders = orders.map(o => ({ ...o, _id: o.id }));
const mappedCustomers = customers.map(c => ({ ...c, _id: c.id }));

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await dbConnect();
        console.log('Connected!');

        console.log('Clearing existing data...');
        await Product.deleteMany({});
        await Order.deleteMany({});
        await User.deleteMany({});

        console.log('Seeding Products...');
        for (let i = 0; i < mappedProducts.length; i++) {
            const product = new Product({
                ...mappedProducts[i],
                createdAt: new Date(Date.now() + i * 1000)
            });
            await product.save();
        }

        console.log('Seeding Users...');
        await User.insertMany(mappedCustomers);

        console.log('Seeding Orders...');
        await Order.insertMany(mappedOrders);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
