import { Router } from "express";
import { deleteMessage, editMessage, getMessages, sendMessage } from "../controller/message";
import authenticateToken from "../middleware/token.mw";
import { verifyToken } from "../utils/token.util";

const router = Router()

    .get("/:conversationId", authenticateToken, getMessages)
    .post('/', authenticateToken, sendMessage)
    .delete("/:messageId", deleteMessage)
    .patch("/:messageId", editMessage)

export default router