import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { prisma } from "../script"

const createComment = asyncHandler(async (req: Request, res: Response) => {
    const { comment, spaceId, userId } = req.body

    const newComment = await prisma.comment.create({
        data: {
            content: comment,
            commentorId: userId,
            spaceId,
        }
    })
    res.status(201).json(newComment)

})

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.body

    await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

    res.status(200).json({ messag: "Deleted!" })
})

const editComment = asyncHandler(async (req: Request, res: Response) => {
    const { commentId, comment } = req.body

    const newComment = await prisma.comment.update({
        where: {
            id: commentId
        }, data: {
            content: comment
        }
    })

    res.status(200).json(newComment)
})

const getComment = asyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.body

    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId
        }
    })

    res.status(200).json(comment)
})
const getAllComments = asyncHandler(async (req: Request, res: Response) => {
    const { spaceId } = req.body

    const comments = await prisma.comment.findMany({
        where: {
            spaceId
        }
    })

    res.status(200).json(comments)
})


export { createComment, deleteComment, editComment, getComment, getAllComments }