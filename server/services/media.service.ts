import { prisma } from "../script"
import { uploadToImageKit, generateThumbnailUrl, deleteFromImageKit } from "../utils/imagekit.util"
import { compressImage } from "../utils/sharp.util"

const getMedias = async () => {
    const media = await prisma.image.findMany({})
    return media
}

const createMedia = async (payload: Express.Multer.File, userId: string) => {
    const { buffer, originalname } = payload
    const data = await compressImage(buffer)
    const meta = await uploadToImageKit(data, originalname)
    const { fileId, filePath, url } = meta
    console.log(meta, "file data")
    const thumnbailUrl = generateThumbnailUrl(filePath)
    // const mediaData = {
    //     id: fileId, filePath, url, thumnbailUrl, originalName
    // }
    const media = await prisma.image.create({
        data: {
            fileId: fileId,
            imageUrl: url,
            thumbnailUrl: thumnbailUrl,
            creatorId: userId
        }
    })
    return media
}

const deleteOneMedia = async (fileId: string, id: string) => {
    await deleteFromImageKit(fileId)
    const data = await prisma.image.delete({
        where: { fileId: fileId, id: id },
    })
    return data
}

export { getMedias, createMedia, deleteOneMedia }