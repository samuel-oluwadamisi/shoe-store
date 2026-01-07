
import mongoose, { Schema, Model } from 'mongoose';
import { Order as OrderType, OrderItem } from '@/data/orders';

interface OrderDocument extends Omit<OrderType, 'id'> {
    _id: string;
}

const OrderItemSchema = new Schema<OrderItem>({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
}, { _id: false });

const OrderSchema = new Schema<OrderDocument>({
    _id: {
        type: String,
        required: true,
        default: () => new mongoose.Types.ObjectId().toHexString()
    },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    total: { type: Number, required: true },
    date: { type: String, required: true },
    shippingAddress: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret: any) {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret: any) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

OrderSchema.pre('validate', function (this: any) {
    if (!this._id) {
        this._id = new mongoose.Types.ObjectId().toHexString();
    }
});

// REVERTED to original model name 'Order'
const Order: Model<OrderDocument> = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
