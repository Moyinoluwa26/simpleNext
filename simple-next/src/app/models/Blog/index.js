import mongoose from 'mongoose';
import build from 'next/dist/build';
import User from '../User';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;