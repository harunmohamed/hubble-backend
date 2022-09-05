import express from "express";
import {
    createHashtag,
    updateHashtag,
    deleteHashtag,
    getHashtag,
    getHashtags,
} from "../controllers/hashtag.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE HASHTAG
router.post("/", verifyUser, createHashtag)

// UPDATE HASHTAG
router.put("/:id", verifyUser, updateHashtag)


//DELETE HASHTAG
router.delete("/:id", verifyAdmin, deleteHashtag)

//GET HASHTAG
router.get("/:name", verifyUser, getHashtag)


// GET ALL HASHTAGS
router.get("/", verifyUser, getHashtags)

export default router;