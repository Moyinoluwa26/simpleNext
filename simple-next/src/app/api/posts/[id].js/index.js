import connectDB from "@/app/lib/database";
import Post from "@/app/models/Post";
import { protect } from "@/app/lib/authMiddleware";

export default async (req, res) => {
    await connectDB();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const post = await Post.findById(id).populate('author', 'username');
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ post });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else if (req.method === "PUT") {
        protect(req, res, async () => {
            const { title, body } = req.body;
            try {
                const post = await Post.findById(id);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                if (post.author.toString() !== req.user._id.toString()) {
                    return res.status(401).json({ message: 'Not authorized to update this post' });
                }
                post.title = title;
                post.body = body;

                await post.save();
                res.status(200).json({ post });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        })
    } else if (req.method === "DELETE") {
        protect(req, res, async () => {
            try {
                const post = await Post.findById(id);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                if (post.author.toString() !== req.user._id.toString()) {
                    return res.status(401).json({ message: 'Not authorized to delete this post' });
                }
                await post.remove();
                res.status(200).json({ message: 'Post removed' });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }

};

