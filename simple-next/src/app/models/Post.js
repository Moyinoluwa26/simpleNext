import mongoose from 'mongoose';


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    body: {
        type: String,
        required: [true, 'Please provide a body'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
export default Post;