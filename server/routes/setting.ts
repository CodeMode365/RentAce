import { Router } from "express";
import { getNotificationSetting, updateNotificationSetting, updatePassword } from "../controller/setting";
import authenticateToken from "../middleware/token.mw";
import { updateGeneralInfo } from "../controller/setting";
import { checkUser } from "../middleware";

const router = Router()

    .get("/notificationSeetting", authenticateToken, checkUser, getNotificationSetting)
    .patch('/password', authenticateToken, updatePassword)
    .patch("/general", authenticateToken, updateGeneralInfo)
    .patch("/update/notificationSetting", authenticateToken, checkUser, updateNotificationSetting)

export default router