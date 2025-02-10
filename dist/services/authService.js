"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = require("../models/UserModel");
const jwt_1 = require("../utils/jwt");
const registerUser = async (email, password) => {
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = new UserModel_1.User({ email, password: hashedPassword });
    await user.save();
    return (0, jwt_1.generateToken)(user._id.toString());
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await UserModel_1.User.findOne({ email });
    if (!user)
        throw new Error('User not found');
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    return (0, jwt_1.generateToken)(user._id.toString());
};
exports.loginUser = loginUser;
