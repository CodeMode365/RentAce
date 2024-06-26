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

    res.status(201).json({ message: "Space Posted!", data: newSpace })
})

const getAllSpaces = asyncHandler(async (req: Request, res: Response) => {
    const allSpaces = await prisma.space.findMany({})

    res.status(200).json({ message: "Spaces fetched", data: allSpaces })
})

const getSpace = asyncHandler(async (req: Request, res: Response) => {
    const spaceId = req.params.id
    const { fulldetail } = req.query

    let spaceData;

    if (fulldetail?.toLocaleString() == "true") {
        spaceData = await prisma.space.findFirst({
            where: {
                id: spaceId
            },
            include: {
                comments: true,
                creator: {
                    select: {
                        id: false,
                        password: false,
                        userType: false,
                        username: true,
                        Image: true,
                    }
                },
                images: {
                    select: {
                        createdAt: false,
                        updatedAt: false,
                        spaceId: false,
                        imageUrl: true,
                    }
                },
                rating: true,
            }
        })
    } else {
        spaceData = await prisma.space.findFirst({
            where: {
                id: spaceId
            }
        })
    }


    res.status(200).json({ message: "Space Fetched!", data: spaceData })
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
    const { id: spaceId, userId } = req.params

    console.log(spaceId, userId)

    const existSpace = await prisma.space.findFirst({
        where: {
            AND: [
                { id: spaceId },
                { creatorId: userId }
            ]
        }
    })

    if (!existSpace) {
        res.status(401).json({ message: "Unauthorized action!" })
        return
    }

    await prisma.space.delete({
        where: {

            id: spaceId
        }
    })

    res.status(200).json({ message: "Space deleted!" })
})

const getMySpaces = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    const spaces = await prisma.space.findMany({
        where: {
            creatorId: userId
        },
        include: {
            images: true
        }
    })

    res.status(200).json({ message: "Spaces successfully fetched!", data: spaces })
})

export { addSpace, getAllSpaces, getSpace, deleteSpace, getMySpaces }