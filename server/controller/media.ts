import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { getMedias, createMedia, deleteOneMedia } from "../services/media.service"
import { prisma } from "../script"

const getAll = asyncHandler(async (req: Request, res: Response) => {
    const medias = await getMedias()
    res.status(200).json({ message: "All media fetched", data: medias })
})


const create = asyncHandler(async (req: Request, res: Response) => {
    const image = req.file;
    const { userId } = req.params


    if (!image) {
        res.status(400).json({ message: "File missing!" })
        return
    }
    const data = await createMedia(image, userId)
    res.status(201).json(data)
})


const destroy = asyncHandler(async (req: Request, res: Response) => {

    const { fileId, id } = req.query;
    const { userId } = req.params

    const existingMedia = await prisma.image.findFirst({
        where: {
            id: id as string,
            fileId: fileId as string,
            creatorId: userId
        }
    })


    if (!existingMedia) {
        res.status(404).json({ message: `Media not found!` })
        return
    }

    const data = await deleteOneMedia(fileId as string, id as string)

    res.status(200).json({ message: "Media deleted!", data })
})

export { destroy, create, getAll }