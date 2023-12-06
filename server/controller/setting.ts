import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { prisma } from "../script"
import { compareWithHash, generateHash } from "../utils/Hash"

const updatePassword = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const { newPassword, oldPassword } = req.body;

    if (!newPassword || !oldPassword) {
        res.status(406).json({ message: "Missing field!" })
    }

    const exisitingUser = await prisma.user.findFirst({
        where: { id: userId },
        select: {
            password: true
        }
    })

    if (!exisitingUser) {
        res.status(401).send({ message: "User doesn't exist!" })
        return
    }


    if (!(await compareWithHash(oldPassword, exisitingUser.password))) {
        res.status(401).json({ message: "Old password doesn't match!" })
        return
    }

    const hashedPassword = await generateHash(newPassword)
    await prisma.user.update({
        where: { id: userId },
        data: {
            password: hashedPassword,
        },
    });

    res.status(200).json({ message: "Password Updated!" });
})



export { updatePassword }