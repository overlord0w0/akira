"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new UserModel_1.User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: 'Invalid credentials' });
        const userId = user._id.toString(); // ✅ Конвертуємо _id у string
        const token = jsonwebtoken_1.default.sign({ id: userId, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // ✅ Переконуємось, що req.session.user існує
        if (!req.session.user) {
            req.session.user = { id: userId };
        }
        else {
            req.session.user.id = userId;
        }
        res.json({ token, message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
exports.login = login;
const logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err)
                return res.status(500).json({ error: 'Logout failed' });
            res.json({ message: 'Logged out successfully' });
        });
    }
    else {
        res.status(400).json({ error: 'No active session' });
    }
};
exports.logout = logout;
