import User from "../models/User.js";

// update user - CAN USE THIS TO ADD HASHTAGS AND MATCHES TOO
export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

// delete user 
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

// get single user
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}


// get all users
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}


// get gendered users 
export const gender = async (req,res,next) => {
  try {
    const oppositeGender = req.user.gender == "male" ? "female" : "male";
    const foundUsers = await User.find({"gender": oppositeGender});
    res.status(200).json(foundUsers);
  } catch (err) {
    next(err);
  }
}