import User from '../models/userModel';

export const getUsers = async () => {
    return await User.find({}, { password: 0 });
};

export const getUserById = async (id: string) => {
    return await User.findById(id, { password: 0 });
};

export const updateUser = async (id: string, updateData: { email?: string; password?: string }) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};
export const deleteUser = async (id: string) => {
    return await User.findByIdAndDelete(id);
};