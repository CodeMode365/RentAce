import { prisma } from "../script"
import { uploadToImageKit, generateThumbnailUrl, deleteFromImageKit } from "../utils/imagekit.util"
import { compressImage } from "../utils/sharp.util"

const getMedias = async () => {
    const media = await prisma.image.findMany({})
    return media
}

const createMedia = async (payload: Express.Multer.File) => {
    const { buffer, originalname } = payload
    const data = await compressImage(buffer)
    const meta = await uploadToImageKit(data, originalname)
    const { fileId, filePath, url } = meta
    const thumnbailUrl = generateThumbnailUrl(filePath)
    // const mediaData = {
    //     id: fileId, filePath, url, thumnbailUrl, originalName
    // }
    const media = await prisma.image.create({
        data: {
            imageUrl: url,
            thumbnailUrl: thumnbailUrl,
        }
    })
    return media
}

const deleteOneMedia = async (fileId: string) => {
    await deleteFromImageKit(fileId)
    const data = await prisma.image.delete({
        where: { id: fileId },
    })
    return data
}

export { getMedias, createMedia, deleteOneMedia }