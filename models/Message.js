import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema (
    {
        from: {
            type: String
        },
        to: {
            type: String
        },
        message: {
            type: String
        }
    },
    { timestamps: true, collection: 'messages' }
)

export default mongoose.model("Message", MessageSchema)