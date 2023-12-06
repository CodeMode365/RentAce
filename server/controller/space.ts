import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { prisma } from "../script"

const addSpace = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const { lng, lat, title, desc, ownerName, spaceType, payType, amount, images } = req.body

    const newSpace = await prisma.space.create({
        data: {
            lng,
            lat,
            amount,
            desc,
            ownerName,
            title,
            spaceType,
            payType,
            creatorId: userId,
            images: {
                connect: images.map((img: any) => ({ id: img.id as string }))
            }
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
// const updateSpace = asyncHandler(async (req: Request, res: Response) => {
//     const {spaceId, lng, lat, } = req.params
//     const pin = await prisma.space.update({
//         where: {
//             id: spaceId
//         }
//     })

//     res.status(200).json(pin)
// })

const deleteSpace = asyncHandler(async (req: Request, res: Response) => {
    const spaceId = req.params.id
    const pin = await prisma.space.delete({
        where: {
            id: spaceId
        }
    })

    res.status(200).json(pin)
})

const getMySpaces = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    const usersSpace = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            spaces: true
        }
    })

    res.status(200).json(usersSpace)
})

export { addSpace, getAllSpaces, getSpace, deleteSpace, getMySpaces }