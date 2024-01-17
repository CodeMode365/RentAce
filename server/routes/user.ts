import { Router } from "express";
import authenticateToken from "../middleware/token.mw";
import { getCurrentUser, getOtherUserInfo, getUserInfo, updateUserInfo } from "../controller/user";

const router = Router()

router.get("/:userId", getOtherUserInfo);
router.get("/userInfo", authenticateToken, getUserInfo)
router.patch("/update/userInfo", authenticateToken, updateUserInfo);
// .get("/my-self", authenticateToken, getUser)

export default router