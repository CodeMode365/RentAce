import { Router } from "express";
import { deleteMessage, editMessage, sendMessage } from "../controller/message";

const router = Router()

    .post('/send', sendMessage)
    .delete("/delete/:messageId", deleteMessage)
    .patch("/edit/:messageId", editMessage)

export default router