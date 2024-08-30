import dbConnect from "@/app/lib/database";
import Blog from "@/app/models/Blog";
import authMiddlewareJs from "@/app/lib";


export async function POST(req) {
    try {

        await dbConnect();




        const { title, content } = await req.json();
        const user = await authMiddlewareJs(req, res, next);

        const blog = new Blog({ title, content, user: user.id });
        await blog.save();

        return new Response(
            JSON.stringify({ message: 'Blog added successfully' }),
            { status: 201 }
        );
    }
    catch (error) {
        console.error('Error adding blog:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        );
    }
};

