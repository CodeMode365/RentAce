import { Router } from "express";
import { addPin, getAllPins, getPin } from "../controller/pin";

const router = Router()

router.post("/create", addPin)
router.get("/", getAllPins)
router.get("/getPin/:id", getPin)

export default router