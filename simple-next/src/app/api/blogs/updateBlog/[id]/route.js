import dbConnect from "@/app/lib/database";
import Blog from "@/app/models/Blog";
import { getUserFromToken } from "@/app/lib/authMiddleware.js";


export async function PUT(req, { params }) {
    await dbConnect();

    const { id } = params;

    const { title, content } = await req.json();
    const user = await getUserFromToken(req);

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return new Response(JSON.stringify({ error: "Blog post not found" }), { status: 404 });
        }

        if (blog.user.toString() !== user._id.toString()) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        if (blog.user.toString() === user._id.toString()) {
            blog.title = title || blog.title;
            blog.content = content || blog.content;

            const updatedBlog = await blog.save();

            return new Response(JSON.stringify(updatedBlog), { status: 200 });

        }
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
