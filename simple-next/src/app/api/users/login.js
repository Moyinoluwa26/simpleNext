import connectDB from "@/app/lib/database";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    await connectDB();

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPasswords(password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
