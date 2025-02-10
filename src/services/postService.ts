import Post from '../models/postModel';

export const createPost = async (text: string, userId: string) => {
    const post = new Post({ text, userId });
    await post.save();
    return post;
};

export const getPostsByUser = async (userId: string) => {
    return await Post.find({ userId });
};

export const updatePost = async (postId: string, text: string) => {
    return await Post.findByIdAndUpdate(postId, { text }, { new: true });
};

export const deletePost = async (postId: string) => {
    return await Post.findByIdAndDelete(postId);
};