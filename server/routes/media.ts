import { Router } from "express";
import * as media from "../controller/media"

const router = Router()

    .get("/getAll", media.getAll)
    .post("/upload", media.create)
    .post("/delete", media.destroy)

export default router