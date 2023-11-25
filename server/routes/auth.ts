import { Router } from "express";
import { login, register } from "../controller/auth";

const router = Router()

    .post("/login", login)
    .post("/register", register)

export default router