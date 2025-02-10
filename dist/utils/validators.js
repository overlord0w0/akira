"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailAndPassword = void 0;
const validateEmailAndPassword = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    next();
};
exports.validateEmailAndPassword = validateEmailAndPassword;
