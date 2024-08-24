import Blog from "@/app/models/blogs";



export async function POST(req, res) {
    const { title, content } = req.body;
    const blog = new Blog({ title, content });
    try {
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}