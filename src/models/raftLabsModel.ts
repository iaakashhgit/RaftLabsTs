import mongoose, { Document, Schema } from "mongoose";

interface IRaftLabs extends Document {
    _id: string;
    name: string;
    age: number;
    address: string;
    location: string;
    email: string;
    password: string;
    _created_at: Date;
    _updated_at: Date;
}

const RaftLabsSchema = new Schema<IRaftLabs>(
    {
        _id: { type: String, },
        name: { type: String, },
        age: { type: Number, },
        address: { type: String, },
        location: { type: String, },
        email: { type: String, },
        password: { type: String, }
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: '_created_at',
            updatedAt: '_updated_at'
        }
    }
);

export default mongoose.model<IRaftLabs>('RaftLabs', RaftLabsSchema, 'RaftLabs');
