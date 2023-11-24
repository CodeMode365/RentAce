import { Router } from "express";
import { addPin, getAllPins, getPin } from "../controller/pin";

const router = Router()

    .post("/create", addPin)
    .get("/", getAllPins)
    .get("/getPin/:id", getPin)

export default router