import { Router } from "express";
import * as media from "../controller/media"
import { uploadStream } from "../middleware/multer.mw";

const router = Router()

    .get("/getAll", media.getAll)
    .post("/upload", uploadStream.single("image"), media.create)
    .post("/delete/:fileId", media.destroy)

export default router