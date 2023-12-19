import { Router } from "express";
import { createConversation, deleteConversation, findConversations, getMyConversations } from "../controller/conversation";
import authenticateToken from "../middleware/token.mw";

const router = Router()

    .post("/", authenticateToken, createConversation)
    .get("/my-coverasations", authenticateToken, getMyConversations)
    .get("/:searchText", findConversations)
    .delete("/:id", deleteConversation)

export default router