import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  gender,
  currentUser,
  hashtagMembers,
  addMatch
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE USER
router.put("/", verifyUser, updateUser);

//DELETE USER
router.delete("/:id", verifyUser, deleteUser);

 //GET ALL USERS
router.get("/", verifyAdmin, getUsers);

//GET USER
router.get("/:id", verifyUser, getUser);

router.get("/current/user", verifyUser, currentUser)


// ADD NEW MATCH TO USER MATCHES
router.put("/add/match", verifyUser, addMatch)

// GET GENDERED USERS
router.get('/gender/match', verifyUser, gender)

// GET USERS WITH COMMON HASHTAGS AS CURRENT USER
router.get("/common/hashtags", verifyUser, hashtagMembers)






export default router;