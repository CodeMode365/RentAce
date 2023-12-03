import { Router } from "express";
import { deleteMessage, editMessage, sendMessage } from "../controller/message";

const router = Router()

    .post('/', sendMessage)
    .delete("/:messageId", deleteMessage)
    .patch("/:messageId", editMessage)

export default router