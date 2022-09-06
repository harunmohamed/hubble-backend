import express from "express";
import {message, messages} from "../controllers/message.js"
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/message", verifyUser, message)
router.get("/messages", verifyUser, messages)

export default router