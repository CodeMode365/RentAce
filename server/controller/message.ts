import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { prisma } from "../script"
import { io } from ".."

const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { message, conversationId, userId } = req.body;


    const newMessage = await prisma.messages.create({
        data: {
            content: message,
            receiver: conversationId,
            sender: userId
        },

    })

    io.emit(`message-${conversationId}`, newMessage)
    res.status(201).json(newMessage)
})

const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    const { messageId } = req.params

    await prisma.messages.delete({
        where: {
            id: messageId
        }
    })

    res.send(200).json({ message: "Deleted!" })
})

const editMessage = asyncHandler(async (req: Request, res: Response) => {
    const { messageId } = req.params
    const { newContent } = req.body

    const updatedMessage = await prisma.messages.update({
        where: {
            id: messageId
        },
        data: {
            content: newContent
        }
    })

    io.emit(`message-${updatedMessage.conversationId}`, updatedMessage)
    res.send(200).json(updatedMessage)
})

export { sendMessage, deleteMessage, editMessage }