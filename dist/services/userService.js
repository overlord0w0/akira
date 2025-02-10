"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getUsers = async () => {
    return await userModel_1.default.find({}, { password: 0 });
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    return await userModel_1.default.findById(id, { password: 0 });
};
exports.getUserById = getUserById;
const updateUser = async (id, updateData) => {
    return await userModel_1.default.findByIdAndUpdate(id, updateData, { new: true });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return await userModel_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
