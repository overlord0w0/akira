"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const UserModel_1 = require("../models/UserModel");
const getUsers = async (req, res) => {
    try {
        const users = await UserModel_1.User.find({}, '-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await UserModel_1.User.findById(req.params.id, '-password');
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.id !== req.params.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const updatedUser = await UserModel_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.id !== req.params.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await UserModel_1.User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
exports.deleteUser = deleteUser;
