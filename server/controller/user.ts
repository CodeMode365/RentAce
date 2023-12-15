import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { prisma } from "../script"

const getUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    if (userId) {
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


export { getUser }
