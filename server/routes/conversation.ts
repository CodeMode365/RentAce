import { Router } from "express";
import { createConversation, deleteConversation, findConversations, getUsersConversation } from "../controller/conversation";

const router = Router()

    .post("/", createConversation)
    .get("/", getUsersConversation)
    .get("/:searchText", findConversations)
    .delete("/:id", deleteConversation)

export default router