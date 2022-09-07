import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const verifyToken = async (req, res, next) => {
  console.log(req.rawHeaders[11])
  const token= req.rawHeaders[11].replace("Bearer " , "")
  //const token = req.header('Authorization').replace('Bearer ', '');
  //console.log(token)
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, async (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = await User.findOne({ "_id":user.id } );
    next();
  });
};

export const verifyUser =  (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user._id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};