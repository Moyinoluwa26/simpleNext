import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/database";
import User from "../../../models/User";

export async function POST(req) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const { email, password } = await req.json();

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
        }
        const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
        // Validate the input
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400 }
            );
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Invalid credentials' }),
                { status: 400 }
            );
        }

        // Check if the password is correct
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return new Response(
                JSON.stringify({ error: 'Invalid credentials' }),
                { status: 400 }
            );
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN } // Token expires in 1 hour
        );

        return new Response(
            JSON.stringify({ message: 'Login successful', token }),
            { status: 200 }
        );

    } catch (error) {
        console.error('Error logging in user:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        );
    }
}