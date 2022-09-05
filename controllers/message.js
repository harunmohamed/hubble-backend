import Message from "../models/Message.js"

export const message = async (req, res, next) => {
    try {
        const newMessage = new Message({
            ...req.body
        });
        await newMessage.save();
        res.status(200).send('Message successfully sent')
    } catch (err) {
        next(err);
    }
};


export const messages = async (req, res, next) => {
    try {
        const {userId, correspondingUserId} = req.query;
        const query = {
            from: userId, to: correspondingUserId
        }
        const foundMessages = await Message.find(query);
        res.status(200).json(foundMessages)
    } catch (err) {
        next(err);
    }
};
