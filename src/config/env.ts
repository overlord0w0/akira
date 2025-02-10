import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://bobrkurva:a2yb8fD5aFcv6qwI@akira.a4ldq.mongodb.net/?retryWrites=true&w=majority&appName=akira';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';