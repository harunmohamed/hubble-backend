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

    let findOtherUsers = await User.find({"gender": oppositeGender  });

    let notSwippedRightUserIds = []

    for (let index = 0; index < findOtherUsers.length; index++) {
      let alreadySwippedRight = req.user.matches.includes(findOtherUsers[index]._id);
      if (!alreadySwippedRight){ notSwippedRightUserIds.push(findOtherUsers[index]._id.toString()) }
    }

    let finalResult = await User.find( {"_id": notSwippedRightUserIds} )

    res.status(200).json(finalResult);
  } catch (err) {
    next(err);
  }
}


// Return matched user information
export const matches = async (req, res, next) => {
  try {
    const usersCurrentUserLikes = req.user.matches // arr1
    const usersWhoLikedCurrentUser = await User.find({"matches" : req.user._id})
    const usersWhoLikedCurrentUserIds = usersWhoLikedCurrentUser.map(user => { return (user._id.toString()) }) // arr2

    const currentUserMatches = usersCurrentUserLikes.filter(user => usersWhoLikedCurrentUserIds.includes(user)) // returns an array of ids
    const matches = await User.find({
      "_id": currentUserMatches
    })

    res.status(200).json(matches);
  } catch (err) {
    next(err);
  }
}

// users current_user matches with to show in chat
export const addMatch = async (req, res, next) => {
  console.log(req.body)
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