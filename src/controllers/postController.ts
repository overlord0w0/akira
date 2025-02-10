import { Response } from "express";
import { Post }  from "../models/postModel";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getPosts = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await Post.find().populate("userId", "name");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
};

export const createPost = async (req: AuthRequest, res: Response) => {
    const { text } = req.body;

    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const post = new Post({ text, userId: req.user.id });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: "Error creating post" });
    }
};

export const updatePost = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error updating post" });
    }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting post" });
    }
};
