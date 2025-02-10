import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { errorHandler } from './middlewares/errorHandler';

const PORT = process.env.PORT || 3000;

const app = express();

// Підключення до бази даних
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
