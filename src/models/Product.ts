
import mongoose, { Schema, Model } from 'mongoose';
import { Product as ProductType } from '@/data/products';

// Extend the interface to include Mongoose fields. we omit 'id' and 'isNew' (reserved)
interface ProductDocument extends Omit<ProductType, 'id' | 'isNew'> {
    _id: string;
    isNewItem?: boolean; // Renamed from isNew to avoid reserved key conflict
}

const ProductSchema = new Schema<ProductDocument>({
    _id: {
        type: String,
        required: true,
        default: () => new mongoose.Types.ObjectId().toHexString()
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: { type: [String], required: true },
    sizes: { type: [String], required: true },
    category: { type: String, required: true },
    features: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 0 },
    isNewItem: { type: Boolean, default: false },
    isPreOrder: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret: any) {
            ret.id = ret._id;
            // Map internal isNewItem back to isNew for frontend compatibility
            ret.isNew = ret.isNewItem;
            delete ret._id;
            delete ret.isNewItem;
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret: any) {
            ret.id = ret._id;
            ret.isNew = ret.isNewItem;
            delete ret._id;
            delete ret.isNewItem;
        }
    }
});

// Middleware to ensure _id is always set as a string hex before validation
ProductSchema.pre('validate', function (this: any) {
    if (!this._id) {
        this._id = new mongoose.Types.ObjectId().toHexString();
    }
});

// REVERTED to original model name 'Product' to use existing data
const Product: Model<ProductDocument> = mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

export default Product;
