import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPost extends Document {
    text: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
    {
        text: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export const Post = mongoose.model<IPost>('Post', PostSchema);
