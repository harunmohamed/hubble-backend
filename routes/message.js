import express from "express";
import {message, messages} from "../controllers/message.js"

const router = express.Router();

router.post("/message", message)
router.get("messages", messages)

export default router