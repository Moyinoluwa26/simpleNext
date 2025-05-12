import dbConnect from "@/app/lib/database";
import Blog from "@/app/models/Blog";
import { getUserFromToken } from "@/app/lib/authMiddleware.js";


export async function POST(req) {
    try {

        await dbConnect();




        const { title, content } = await req.json();
        const user = await getUserFromToken(req);

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

