import { Router } from "express"

import authRoute from "./auth"
import spaceRoute from "./space"
import mediaRoute from "./media"
import commentRoute from "./comments"
import conversationRoute from "./conversation"
import messageRoute from "./message"
import ratingRoute from "./rating"
import notificationRoute from "./notification"
import settingRoute from "./setting"
import userRoute from "./user"
import routePaster from "../utils/routepaster.util"


const router = Router()

router.use("/", routePaster)
router.use("/space", spaceRoute)
router.use("/auth", authRoute)
router.use("/media", mediaRoute)
router.use("/conversation", conversationRoute)
router.use("/message", messageRoute)
router.use("/notification", notificationRoute)
router.use("/rating", ratingRoute)
router.use("/comment", commentRoute)
router.use("/settings", settingRoute)
router.use("/users", userRoute)

export default router