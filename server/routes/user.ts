import { Router } from "express";
import { getCurrentUser, getOtherUserInfo, getUserInfo, updateUserInfo } from "../controller/user";
import { authenticateToken, checkUser } from "../middleware";

const router = Router()

router.get("/userInfo", authenticateToken, checkUser, getUserInfo)
router.patch("/update/userInfo", authenticateToken, checkUser, updateUserInfo);
router.get("/:userId", checkUser, getOtherUserInfo);
// .get("/my-self", authenticateToken, getUser)

export default router