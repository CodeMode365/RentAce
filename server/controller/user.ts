import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { prisma } from "../script"

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!userId) {
        res.status(400).json({ message: "Request Error!" })
        return
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })


    res.status(201).json({ message: "Data fethed!", data: user })
})

const getOtherUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!userId) {
        res.status(400).json({ message: "Request Error!" })
        return
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            userInfo: {
                select: {
                    createdAt: false,
                    updatedAt: false,
                    Address: true,
                    City: true,
                    Country: true,
                    phone: true,
                    State: true,
                    User: true
                }
            }
        }
    })
})

const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!userId) {
        res.status(401).json({ message: "User not found!" })
        return
    }

    const userInfo = await prisma.userInfo.findFirst({
        where: {
            User: {
                id: userId
            }
        }
    })

    res.status(200).json({ message: "User Info Fetched!", data: userInfo })
})

const updateUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const { phone, Address, Country, State, City, Zip, isPublic, id } = req.body

    if (!userId) {
        res.status(401).json({ message: "User not found!" })
        return
    }

    const updateUser = await prisma.userInfo.update({
        where: {
            id,
            User: {
                id: userId
            }
        },
        data: {
            phone,
            Address,
            City,
            State,
            Zip,
            isPublic,
            Country
        }
    })

    res.status(200).json({ message: "User Info Updated!", data: updateUser })
})

export { getCurrentUser, getOtherUserInfo, getUserInfo, updateUserInfo }
