
import mongoose, { Schema, Model } from 'mongoose';
import { Customer as CustomerType } from '@/data/customers';

interface UserDocument extends Omit<CustomerType, 'id'> {
    _id: string;
}

const UserSchema = new Schema<UserDocument>({
    _id: {
        type: String,
        required: true,
        default: () => new mongoose.Types.ObjectId().toHexString()
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    orderCount: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    joinDate: { type: String, required: true },
    lastOrderDate: { type: String, default: null },
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

UserSchema.pre('validate', function (this: any) {
    if (!this._id) {
        this._id = new mongoose.Types.ObjectId().toHexString();
    }
});

// REVERTED to original model name 'User'
const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;
