import { Router } from "express";
import { addSpace, getAllSpaces, getMySpaces, getSpace } from "../controller/space";
import authenticateToken from "../middleware/token.mw";

const router = Router()

    .post("/add", authenticateToken, addSpace)
    .get("/", getAllSpaces)
    .get("/self", authenticateToken, getMySpaces)
    .get("/:id", getSpace)

export default router