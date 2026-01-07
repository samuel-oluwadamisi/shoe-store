import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import mongoose from 'mongoose';
import dbConnect from '../lib/db';

async function cleanup() {
    try {
        console.log('Connecting to MongoDB...');
        await dbConnect();

        const db = mongoose.connection.db;
        if (!db) throw new Error('Database connection failed');

        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        console.log('Found collections:', collectionNames);

        const keep = ['products', 'users', 'orders'];
        const redundant = collectionNames.filter(name => !keep.includes(name));

        if (redundant.length === 0) {
            console.log('No redundant collections found.');
        } else {
            console.log('Redundant collections to drop:', redundant);
            for (const name of redundant) {
                await db.dropCollection(name);
                console.log(`Dropped collection: ${name}`);
            }
        }

        console.log('\nFinal collections:', (await db.listCollections().toArray()).map(c => c.name));
        process.exit(0);
    } catch (error) {
        console.error('Error cleaning up database:', error);
        process.exit(1);
    }
}

cleanup();
