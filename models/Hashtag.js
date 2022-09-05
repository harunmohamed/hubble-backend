import mongoose from 'mongoose';
const HashtagSchema = new mongoose.Schema (
    {
        author: {
            type: String
        },
        img_url: {
            type: String
        },
        about: {
            type: String
        },
        members: {
            type: [String]
        },
    },
    { timestamps: true }
)

export default mongoose.model("Hashtag", HashtagSchema)