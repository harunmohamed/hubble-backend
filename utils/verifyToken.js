import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const verifyToken = async (req, res, next) => {

  res.setHeader("X-Powered-By", "Hubble Team");
      res.setHeader(
        "Contibutors",
        "Harun Mohamed, Can Ilgu"
      );

  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) { 
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, async (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = await User.findById(user.id);
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  verifyToken(req, res, next, async () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
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