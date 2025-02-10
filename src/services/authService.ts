import bcrypt from 'bcryptjs';
import { User } from '../models/UserModel';
import { generateToken } from '../utils/jwt';

export const registerUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    return generateToken(user._id.toString());
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    return generateToken(user._id.toString());
};