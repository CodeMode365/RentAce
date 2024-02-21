import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { prisma } from "../script"
// import { io } from ".."

const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { message, convId } = req.body;
    const { userId } = req.params

    const existConversation = await prisma.conversation.findFirst({
        where: {
            id: convId
        }
    })

    if (!existConversation) {
        res.status(404).json({ message: "Conversation not found!" })
        return
    }

    const newMessage = await prisma.message.create({
        data: {
            content: message,
            senderId: userId,
            conversationId: convId
        }
    })

    // io.emit(`message-${receiverId}`, newMessage)
    res.status(201).json(newMessage)
})

const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    const { messageId, userId } = req.params

    const findMessage = await prisma.message.findFirst({
        where: {
            AND: [
                { senderId: userId },
                { id: messageId }
            ]
        }
    })

    if (!findMessage) {
        res.status(401).json({ message: "Not authorized to delete!" })
        return
    }

    await prisma.message.delete({
        where: {
            id: messageId
        }
    })

    res.send(200).json({ message: "Deleted!" })
})

const editMessage = asyncHandler(async (req: Request, res: Response) => {
    const { messageId } = req.params
    const { newContent } = req.body

    const updatedMessage = await prisma.message.update({
        where: {
            id: messageId
        },
        data: {
            content: newContent
        }
    })

    // io.emit(`message-${updatedMessage.conversationId}`, updatedMessage)
    res.send(200).json(updatedMessage)
})

const getMessages = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query
    const { userId, conversationId } = req.params

    const messages = await prisma.message.findMany({
        where: {
            AND: [
                {
                    conversationId: conversationId
                },
                {
                    conversation: {
                        participates: {
                            some: {
                                id: userId
                            }
                        }
                    }
                }
            ]
        },
        take: parseInt(limit as string),
        skip: parseInt(page as string),
        orderBy: {
            createdAt: "asc"
        }
    })

    res.status(200).json(messages)

})
export { sendMessage, deleteMessage, editMessage, getMessages }