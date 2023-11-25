import { Router } from "express";
import { updatePassword, updateUserName } from "../controller/user";

const router = Router()

    .post("/name", updateUserName)
    .post("/password", updatePassword)

export default router