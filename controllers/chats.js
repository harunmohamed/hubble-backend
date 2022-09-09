import Chats from "../models/Chats.js"


export const saveMessage = async (data) => {
    try {
        let newMessage = false;
        
        if (data["data"].toString().length > 1) {
            
            newMessage = await Chats.findOneAndUpdate(
                {'room_name' : data['roomName']}, 
                { $push: {messages: data}}
            )
        }
        
        return newMessage ? true : false
    
    } catch (err) {
        return false;
    }
};


export const createRoom = async (data) => {
    try {
        let room = await Chats.create(
            { 
                room_name: data['roomName'], created_by: data['created_by'], 
                target_user: data['target_user'] 
            }
        )
        return room ?  true : false;
    } catch (err) {
        return false;
    }
};
