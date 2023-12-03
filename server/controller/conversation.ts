import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { prisma } from "../script"


const createConversation = asyncHandler(async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;


    const existingConversation = await prisma.conversation.findFirst({
        where: {
            AND: [
                {
                    participates: {
                        every: {
                            OR: [
                                {
                                    id: senderId,
                                },
                                {
                                    id: receiverId,
                                },
                            ],
                        },
                    },
                },
                {
                    participates: {
                        some: {
                            id: senderId,
                        },
                    },
                },
                {
                    participates: {
                        some: {
                            id: receiverId,
                        },
                    },
                },
            ],
        },
    });


    if (existingConversation) {
        res.status(302).json(existingConversation)
        return
    }


    const newConversation = await prisma.conversation.create({
        data: {
            participates: {
                connect: [{ id: senderId }, { id: receiverId }]
            }
        }
    })

    res.status(201).json(newConversation)
})

const deleteConversation = asyncHandler(async (req: Request, res: Response) => {
    const { conversationId } = req.params

    const existingConversation = await prisma.conversation.findFirst({
        where: {
            id: conversationId
        }
    })

    if (!existingConversation) {
        res.status(404).json({ message: "Conversation doesn't exist!" })
        return
    }

    await prisma.conversation.delete({
        where: {
            id: conversationId
        }
    })

    res.status(202).json({ message: "Deleteted!" })
})

const findConversations = asyncHandler(async (req: Request, res: Response) => {
    const { searchText } = req.params

    const existingConversations = await prisma.conversation.findMany({
        where: {
            participates: {
                some: {
                    username: {
                        contains: searchText,
                    },
                },
            },
        },
    });

    res.status(200).json(existingConversations)
})

const getUsersConversation = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body

    const usersConversations = await prisma.conversation.findMany({
        where: {
            participates: {
                some: {
                    id: userId
                }
            }
        }
    })

    res.status(200).json(usersConversations)
})

export { createConversation, deleteConversation, findConversations, getUsersConversation }