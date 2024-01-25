import { Router } from "express";
import { login, myAuthToken, myInfo, register, updatePassword } from "../controller/auth";
import authenticateToken from "../middleware/token.mw";

const router = Router()

    .post("/login", login)
    .post("/register", register)
    .get("/authToken", myAuthToken)
    .get("/my-info", authenticateToken, myInfo)
    .patch("/updatePassword", authenticateToken, updatePassword)
    
export default router