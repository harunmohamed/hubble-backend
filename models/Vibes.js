import mongoose from 'mongoose';
const VibeSchema = new mongoose.Schema (
    {
        category: {
            type: String,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        img_url: {
            type: String
        },
        members: {
            type: [String]
        },
    },
    { timestamps: true, collection: 'vibes' }
)

export default mongoose.model("Vibe", VibeSchema) 