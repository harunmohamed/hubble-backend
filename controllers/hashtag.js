import Hashtag from "../models/Hashtag";

// update hashtag with new members when user follows a hashtag
export const updateHashtag = async (req, res, next) => {
    try {
        const updatedHashtag = await Hashtag.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {new : true}
        );
        res.status(200).json(updatedHashtag);
    } catch (err) {
        next(err);
    }
}

// delete hashtag: only when the current_user is the author of the hashtag
export const deleteHashtag = async (req, res, next) => {
    try {
        await Hashtag.findByIdAndDelete(req.params.id);
        res.status(200).json("Hashtag has been deleted.");
    } catch (err) {
        next(err)
    }
}


// get single hashtag
export const getHashtag = async (req, res, body) => {
    try {
        const hashtag = await Hashtag.findById(req.params.id);
        res.status(200).json(hashtag); 
    } catch (err) {
        next(err)
    }
}


// get all hashtags
export const getHashtags = async (req, res, next) => {
    try {
        const hashtags = Hashtag.find();
        res.status(200).json(hashtags);
    } catch (err) {
        next(err);
    }
}
