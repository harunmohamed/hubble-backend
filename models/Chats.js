import mongoose from 'mongoose';
const ChatSchema = new mongoose.Schema (
    {
        room_name: {
            type: String,
            unique: true
        },
        messages: {
            type: [Object]
        },
        created_by: {
            type: String
        },
        target_user: {
            type: String
        }
    },
    { timestamps: true, collection: 'chats' }
)

export default mongoose.model("Chat", ChatSchema)