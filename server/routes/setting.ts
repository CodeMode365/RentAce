import { Router } from "express";
import { updateNotificationSetting, updatePassword } from "../controller/setting";
import authenticateToken from "../middleware/token.mw";
import { updateGeneralInfo } from "../controller/setting";

const router = Router()

router.patch('/password', authenticateToken, updatePassword)
router.patch("/general", authenticateToken, updateGeneralInfo)
router.patch("/notifications", authenticateToken, updateNotificationSetting)

export default router