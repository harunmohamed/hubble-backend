import express from "express";
import {
    updateHashtag,
    deleteHashtag,
    getHashtag,
    getHashtags,
} from "../controllers/hashtag.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// UPDATE HASHTAG
router.put("/:id", verifyUser, updateHashtag)


//DELETE HASHTAG
router.delete("/:id", verifyAdmin, deleteHashtag)

//GET HASHTAG
router.get("/:id", verifyUser, getHashtag)


// GET ALL HASHTAGS
router.get("/:id", verifyUser, getHashtags)

export default router;