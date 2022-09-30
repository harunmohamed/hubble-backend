import express from "express";
import {
    createVibe,
    updateVibe,
    deleteVibe,
    getVibe,
    getVibes,
} from "../controllers/Vibe.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE VIBE
router.post("/", verifyUser, createVibe)

// UPDATE VIBE
router.put("/:id", verifyUser, updateVibe)


//DELETE VIBE
router.delete("/:id", verifyAdmin, deleteVibe)

//GET VIBE
router.get("/:name", verifyUser, getVibe)


// GET ALL VIBE
router.get("/", verifyUser, getVibes)

export default router;