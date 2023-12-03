import { Router } from "express";
import { deleteComment, getAllComments, getComment, createComment, editComment } from "../controller/comment";

const router = Router()

    .get("/", getAllComments)
    .get("/:id", getComment)
    .post("/", createComment)
    .patch("/:id", editComment)
    .delete("/:id", deleteComment)


export default router