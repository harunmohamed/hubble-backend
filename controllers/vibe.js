import Vibe from "../models/Vibe.js";

// create vibe 
export const createVibe = async( req, res, next) => {
    try {
        const newVibe = await Vibe.create(req.body)
        res.status(201).json(newVibe)
    } catch (err) {
        next(err);
    }
}

// update vibe with new members when user joins a vibe
export const updateVibe = async (req, res, next) => {
    try {
        const updatedVibe = await Vibe.findByIdAndUpdate(
            req.params.id,
            { $addToSet: req.body },
            {new : true}
        );
        res.status(200).json( {data: updatedVibe });
    } catch (err) {
        next(err);
    }
}

// delete vibe: only when the current_user an admin
export const deleteVibe = async (req, res, next) => {
    try {
        await Vibe.findByIdAndDelete(req.params.id);
        res.status(200).json("Vibe has been deleted.");
    } catch (err) {
        next(err)
    }
}


// get single vibe
export const getVibe = async (req, res, next) => {
    try {
        const Vibe = await Vibe.findOne({name:  new RegExp('^'+req.params.name+'$', "i")});
        res.status(200).json( { data:Vibe }); 
    } catch (err) {
        next(err)
    }
}


// get all vibes
export const getVibes = async (req, res, next) => {
    try {
        const Vibes = await Vibe.find();
        res.status(200).json( { data:Vibes });
    } catch (err) {
        next(err);
    }
}
