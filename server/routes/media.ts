import { Router } from "express";
import * as media from "../controller/media"

const router = Router()

router.get("/getAll", media.getAll)
router.post("/upload", media.create)
router.post("/delete", media.destroy)

export default router