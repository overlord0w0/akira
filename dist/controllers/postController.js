"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const getPosts = async (req, res) => {
    try {
        const posts = await postModel_1.default.find().populate("userId", "name");
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
};
exports.getPosts = getPosts;
const createPost = async (req, res) => {
    const { text } = req.body;
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const post = new postModel_1.default({ text, userId: req.user.id });
        await post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating post" });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const post = await postModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating post" });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const post = await postModel_1.default.findByIdAndDelete(req.params.id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting post" });
    }
};
exports.deletePost = deletePost;
