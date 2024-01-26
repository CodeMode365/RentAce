import { Request, Response } from "express"
import { prisma } from "../script"
import asyncHandler from "express-async-handler"
import { compareWithHash, generateHash } from "../utils/Hash"
import { generateToken } from "../utils/token.util"
import cache from "memory-cache"

const cacheDuration = 60 * 60 * 1000 //1h

const register = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    const hashedPassword = await generateHash(password)
    const existingUser = await prisma.user.findFirst({
        where: { email }
    })
    if (existingUser) {
        res.status(409).json({ message: "Email Already Taken!" })
        return
    }
    const userInfoStore = await prisma.userInfo.create({ data: {}, select: { id: true } },)
    const userNotificationSetting = await prisma.notificationSetting.create({ data: {}, select: { id: true } })
    const newUser = await prisma.user.create({
        data: {
            username, email, password: hashedPassword,
            userInfoId: userInfoStore.id,
            userNotifiSetId: userNotificationSetting.id
        }, select: {
            id: true,
            email: true,
            username: true,
        }
    })
    const token = generateToken(newUser.id)
    cache.put('authToken', token, cacheDuration)
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        token
    })
})

const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const findUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!findUser) {
        res.status(404).json({ message: "Email not registered!" })
        return
    }
    if (!await compareWithHash(password, findUser.password)) {
        res.status(406).json({ message: "Password didn't match!" })
        return
    }
    const token = generateToken(findUser.id)
    cache.put('authToken', token, cacheDuration)

    res.status(200).json({ email: findUser.email, username: findUser.username, token })

})

const myInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    const findUser = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            userType: true,
            email: true,
            ratings: true,
            updatedAt: true,
            createdAt: true,
            userInfo: true
        }
    })
    if (!findUser) {
        res.status(404).json({ message: "User not Found!" })
        return
    }

    res.status(200).json(findUser)
})

const myAuthToken = asyncHandler(async (req: Request, res: Response) => {
    const cachedToken = cache.get("authToken")
    res.status(200).json({ token: cachedToken })
})

const updatePassword = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const { oldPassword, newPassword } = req.body
    const findUser = await prisma.user.findFirst({
        where: { id: userId }
    })
    if (!findUser) {
        res.status(404).json({ message: "User not found!" })
        return
    }
    if (!(await compareWithHash(oldPassword, findUser.password))) {
        res.status(401).json({ message: "Incorrect old password!" })
        return
    }
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: await generateHash(newPassword)
        }
    })
    res.status(200).json({ message: "Password Updated!" })
})

export { register, login, myInfo, myAuthToken, updatePassword }