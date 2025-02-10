import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    text: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema({
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPost>('Post', PostSchema);