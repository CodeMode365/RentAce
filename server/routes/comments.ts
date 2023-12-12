import { Router } from "express";
import { deleteComment, getAllComments, getComment, createComment, editComment } from "../controller/comment";

const router = Router()

    .get("/", getAllComments)
    .get("/:id", getComment)
    .post("/new", createComment)
    .patch("/edit/:id", editComment)
    .delete("/del/:id", deleteComment)


export default router