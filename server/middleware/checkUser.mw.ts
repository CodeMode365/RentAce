import { NextFunction, Request, Response } from "express"
import { prisma } from "../script"

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params
    if (!userId) {
        res.status(401).json({ message: "Token invalid!" })
        return
    }
    next()
}