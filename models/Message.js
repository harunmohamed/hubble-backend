import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema (
    {
        from: {
            type: String
        },
        to: {
            type: String
        },
    },
    { timestamps: true }
)

export default mongoose.model("Message", MessageSchema)