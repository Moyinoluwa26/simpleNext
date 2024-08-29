import dbConnect from "../../../lib/database";
import User from "../../../models/User";

export async function POST(req) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const { email, password, username } = await req.json();


        const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
        // Validate the input
        if (!email || !password || !username) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: 'User already exists' }),
                { status: 400 }
            );
        }

        // Create a new user
        const user = new User({ email, password, username });
        await user.save();





        return new Response(
            JSON.stringify({ message: 'User registered successfully' }),
            { status: 201 }
        );


    } catch (error) {
        console.error('Error registering user:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        );
    }
}
