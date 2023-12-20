import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { prisma } from "../script"


const createConversation = asyncHandler(async (req: Request, res: Response) => {
    const { receiverId } = req.body;
    const senderId = req.params.userId


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
        select: {
            participates: true,
            id: true,
            createdAt: true,
            updatedAt: true
        }
    });


    if (existingConversation) {
        res.status(200).json({ message: "Existing conversation", data: existingConversation })
        return
    }


    const newConversation = await prisma.conversation.create({
        data: {
            participates: {
                connect: [{ id: senderId }, { id: receiverId }]
            }
        }
    })

    res.status(201).json({ message: "Conversation created", data: newConversation })
})

const deleteConversation = asyncHandler(async (req: Request, res: Response) => {
    const conversationId = req.params.id

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

const getMyConversations = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params


    console.log("hello")
    const usersConversations = await prisma.conversation.findMany({
        where: {
            participates: {
                some: {
                    id: userId
                }
            },
        },
        include: {
            participates: {
                where: {
                    id: {
                        not: userId
                    }
                }
            },
            messages: {
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            }
        },

    })

    res.status(200).json(usersConversations)
})

export { createConversation, deleteConversation, findConversations, getMyConversations }