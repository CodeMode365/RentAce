import { Router } from "express";
import { addSpace, deleteSpace, getAllSpaces, getMySpaces, getSpace } from "../controller/space";
import authenticateToken from "../middleware/token.mw";

const router = Router()

    .post("/add", authenticateToken, addSpace)
    .get("/", getAllSpaces)
    .get("/self", authenticateToken, getMySpaces)
    .get("/:id", getSpace)
    .delete("/remove/:id", authenticateToken, deleteSpace)

export default router