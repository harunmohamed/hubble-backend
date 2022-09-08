import Hashtag from "../models/Hashtag.js";
import User from "../models/User.js";
import mongoose from "mongoose";


export const currentUser = async(req, res, next) => {
  return res.status(200).json(req.user)
}
// update user - CAN USE THIS TO ADD HASHTAGS AND MATCHES TOO
export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
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
    const user = await User.findById(req.user.id);
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

// users current_user matches with to show in chat
export const addMatch = async (req, res, next) => {

  const updateMatch = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { matches: req.body.matchedUserId } },
    { new: true }
  );

  let matched = false
  const checkMatch = await User.find( { matches: {"$in" : [ req.user._id ] },  "_id": req.body.matchedUserId }  )
  
  checkMatch.length >= 1 ? matched = true : matched = false;

  res.status(200).json({"isMatch": matched}); 
}


// users who follow the same hashtags as current user
export const hashtagMembers = async (req, res, next) => {
  const toHashtags = await Hashtag.find( { name:req.user.hashtags} )

  const memberIds = {}
  
  for (let data = 0; data < toHashtags.length; data++) {
    const element = toHashtags[data].members;
    
    for (let index = 0; index < element.length; index++) {
      if (element[index] !== req.user._id.toString()){
        memberIds[index] = element[index]
      }
      
    }
  }

  const otherMembers = []
  for (const id in memberIds) {
    let userObject = await User.find( { "_id": memberIds[id] } )  
    otherMembers.push(userObject);
  }

  return res.status(200).json(otherMembers)
}