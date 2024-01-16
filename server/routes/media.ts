import { Router } from "express";
import * as media from "../controller/media"
import { uploadStream } from "../middleware/multer.mw";
import authenticateToken from "../middleware/token.mw";

const router = Router()

    .get("/getAll", media.getAll)
    .post("/upload", authenticateToken, uploadStream.single("image"), media.create)
    .delete("/delete", authenticateToken, media.destroy)

export default router