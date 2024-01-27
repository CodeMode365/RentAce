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

const updateGeneralInfo = asyncHandler(async (req: Request, res: Response) => {

})


const getNotificationSetting = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const userInfo = await prisma.notificationSetting.findFirst({
        where: {
            User: {
                id: userId
            }
        }
    })
    res.status(200).json({ message: "Notification setting fetched!!", data: userInfo })
})

const updateNotificationSetting = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const { SubscribeComments, SubscribeMessages, SubscribeFollows, SubscribeNews, SubscribeApprovals, } = req.body
    const userNotificationSettting = await prisma.notificationSetting.findFirst({ where: { User: { id: userId } }, select: { id: true } })
    const updatedSetting = await prisma.notificationSetting.update({
        where: {
            id: userNotificationSettting?.id
        },
        data: {
            SubscribeApprovals, SubscribeComments, SubscribeFollows,
            SubscribeMessages, SubscribeNews
        }
    })
    res.status(200).json({ message: "Setting Updated!", data: updatedSetting })
})


export { updatePassword, updateGeneralInfo, getNotificationSetting, updateNotificationSetting }