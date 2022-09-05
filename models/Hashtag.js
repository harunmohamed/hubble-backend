import mongoose from 'mongoose';
const HashtagSchema = new mongoose.Schema (
    {
        owner: {
            type: String
        },
        img_url: {
            type: String
        },
        about: {
            type: String
        },
        members: {
            type: [{String}]
        },
    },
    { timestamps: true, collection: 'hashtags' }
)

export default mongoose.model("Hashtag", HashtagSchema)