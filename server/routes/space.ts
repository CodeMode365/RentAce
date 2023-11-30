import { Router } from "express";
import { addSpace, getAllSpaces, getSpace } from "../controller/space";

const router = Router()

    .post("/create", addSpace)
    .get("/", getAllSpaces)
    .get("/get/:id", getSpace)

export default router