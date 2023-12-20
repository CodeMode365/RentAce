import { Request, Response } from "express"
import { prisma } from "../script"
import asyncHandler from "express-async-handler"
import { compareWithHash, generateHash } from "../utils/Hash"
import { generateToken } from "../utils/token.util"

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

    const newUser = await prisma.user.create({
        data: {
            username, email, password: hashedPassword,
            userInfoId: userInfoStore.id
        }, select: {
            id: true,
            email: true,
            username: true,
        }
    })

    const token = generateToken(newUser.id)

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
    const token = await generateToken(findUser.id)

    res.status(200).send({ email: findUser.email, username: findUser.username, token })

})

const myInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    const findUser = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    console.log("Users", findUser)

    res.status(200).send(findUser)
})

export { register, login, myInfo }