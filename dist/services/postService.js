"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostsByUser = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const createPost = async (text, userId) => {
    const post = new postModel_1.default({ text, userId });
    await post.save();
    return post;
};
exports.createPost = createPost;
const getPostsByUser = async (userId) => {
    return await postModel_1.default.find({ userId });
};
exports.getPostsByUser = getPostsByUser;
const updatePost = async (postId, text) => {
    return await postModel_1.default.findByIdAndUpdate(postId, { text }, { new: true });
};
exports.updatePost = updatePost;
const deletePost = async (postId) => {
    return await postModel_1.default.findByIdAndDelete(postId);
};
exports.deletePost = deletePost;
