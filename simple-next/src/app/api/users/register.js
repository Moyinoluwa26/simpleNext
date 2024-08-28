import connectDB from "@/app/lib/database";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";



export default async (req, res) => {
    await connectDB();

    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) { return res.status(400).json({ message: 'User already exists' }); };

        const user = await User.create({
            username,
            email,
            password,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}