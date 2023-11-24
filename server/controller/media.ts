import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { getMedias, createMedia, deleteOneMedia } from "../services/media.service"

const getAll = asyncHandler(async (req: Request, res: Response) => {
    const medias = await getMedias()
    res.status(200).json({ message: "All media fetched", data: medias })
})


const create = asyncHandler(async (req: Request, res: Response) => {
    const image = req.file;

    if (!image) {
        res.status(400).json({ message: "File missing!" })
        return
    }
    const data = await createMedia(image)
    res.status(201).json({ message: "Media Created", data })
})


const destroy = asyncHandler(async (req: Request, res: Response) => {
    const { fileId } = req.params;
    const data = await deleteOneMedia(fileId)
    res.status(200).json({ message: "Media deleted!", data })
})

export { destroy, create, getAll }