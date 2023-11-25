import asycnHandler from "express-async-handler"
import { Request, Response } from "express"
import { prisma } from "../script"

const updateUserName = asycnHandler(async (req: Request, res: Response) => {
    const { userId, newUserName } = req.body

    if (!userId || !newUserName) {
        res.status(400).json({ message: "Requrement not met!" })
        return
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username: newUserName
        }, select: {
            username: true
        }
    })

    res.status(200).json({ message: "Username updated!", data: updatedUser })
})

const updatePassword = asycnHandler(async (req: Request, res: Response) => {
    const { userId, oldPassword, newPassword } = req.body

    if (!userId || !oldPassword || !newPassword) {
        res.status(400).json({ message: "Requirement not met!" })
        return
    }

    res.status(200).json({ message: "Password Updated!" })
})


export { updateUserName, updatePassword }