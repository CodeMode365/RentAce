import { Router } from "express";
import authenticateToken from "../middleware/token.mw";
import { getUser } from "../controller/user";

const router = Router()

    .get("/my-self", authenticateToken, getUser)

export default router