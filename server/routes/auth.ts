import { Router } from "express";
import { login, myInfo, register } from "../controller/auth";
import authenticateToken from "../middleware/token.mw";

const router = Router()

    .post("/login", login)
    .post("/register", register)
    .get("/my-info", authenticateToken, myInfo)

export default router