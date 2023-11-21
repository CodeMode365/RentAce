import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { prisma } from "../script"

const addPin = asyncHandler(async (req: Request, res: Response) => {
    const { desc, lat, long, rating, title } = req.body

    const newPin = await prisma.pin.create({
        data: {
            desc,
            lat,
            long,
            rating,
            title,
        }
    })

    res.status(201).json(newPin)
})

const getAllPins = asyncHandler(async (req: Request, res: Response) => {
    const allPins = await prisma.pin.findMany({})

    res.status(200).json(allPins)
})

export { addPin, getAllPins }