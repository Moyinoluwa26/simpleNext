import dbConnect from "@/app/lib/database";
import Blog from "@/app/models/Blog";

export async function GET() {
    await dbConnect();

    try {
        const blogs = await Blog.find().populate("user");

        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
