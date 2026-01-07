
import dbConnect from './src/lib/db';
import Product from './src/models/Product';
import { loadEnvConfig } from '@next/env';
import path from 'path';

loadEnvConfig(process.cwd());

async function diagnose() {
    console.log('Starting raw diagnosis...');
    try {
        await dbConnect();
        const all = await Product.find({}).lean();
        console.log('Products found:', all.length);
        if (all.length > 0) {
            console.log('Keys in first product:', Object.keys(all[0]));
            all.forEach(p => {
                console.log(`- Name: ${p.name}, isNewItem: ${p.isNewItem}, isNew: ${(p as any).isNew}`);
            });
        }
    } catch (error) {
        console.error('Diagnosis failed:', error);
    } finally {
        process.exit();
    }
}

diagnose();
