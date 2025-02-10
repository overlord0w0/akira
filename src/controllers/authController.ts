import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel';
import { AuthRequest } from '../types/express-session';
import { Document } from 'mongoose';

interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
};

export const login = async (req: AuthRequest, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }) as IUser | null;

        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const userId = user._id.toString(); // ✅ Конвертуємо _id у string

        const token = jwt.sign({ id: userId, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        // ✅ Переконуємось, що req.session.user існує
        if (!req.session.user) {
            req.session.user = { id: userId };
        } else {
            req.session.user.id = userId;
        }

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

export const logout = (req: AuthRequest, res: Response) => {
    if (req.session) {
        req.session.destroy((err: Error | null) => {
            if (err) return res.status(500).json({ error: 'Logout failed' });
            res.json({ message: 'Logged out successfully' });
        });
    } else {
        res.status(400).json({ error: 'No active session' });
    }
};
