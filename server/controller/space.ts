import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { prisma } from "../script"

const addSpace = asyncHandler(async (req: Request, res: Response) => {
    const { lng, lat, title, desc, ownerName, spaceType, payType, userId, amount } = req.body

    const newSpace = await prisma.space.create({
        data: {
            lng,
            lat,
            amount,
            desc,
            ownerName,
            title,
            userId,
            spaceType,
            payType
        }
    })

    res.status(201).json(newSpace)
})

const getAllSpaces = asyncHandler(async (req: Request, res: Response) => {
    const allSpaces = await prisma.space.findMany({})

    res.status(200).json(allSpaces)
})

const getSpace = asyncHandler(async (req: Request, res: Response) => {
    const spaceId = req.params.id
    const pin = await prisma.space.findFirst({
        where: {
            id: spaceId
        }
    })

    res.status(200).json(pin)
})

export { addSpace, getAllSpaces, getSpace }