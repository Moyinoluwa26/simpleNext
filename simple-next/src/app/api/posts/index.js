import connectDB from "@/app/lib/database";
import Post from "@/app/models/Post";
import { protect } from "@/app/lib/authMiddleware";

export default async (req, res) => {
    await connectDB();

    if (req.method === "GET") {
        try {
            const posts = await Post.find({}).populate('autor', 'username');
            res.status(200).json({ posts });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    else if (req.method === "POST") {
        protect(req, res, async () => {
            const { title, body } = req.body;
            try {
                const post = await Post.create({
                    title,
                    body,
                    autor: req.user._id,
                });
                res.status(201).json({ post });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
