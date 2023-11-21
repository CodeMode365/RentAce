import { Router } from "express";
import { addPin, getAllPins } from "../controller/pin";

const router = Router()

router.post("/create", addPin)
router.get("/", getAllPins)

export default router