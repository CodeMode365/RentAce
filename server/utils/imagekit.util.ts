import ImageKit from "imagekit";
import vars from "../config/vars.config"
import { ReadStream } from "fs";

const { ik } = vars

const imageKit = new ImageKit({
    privateKey: ik.private_key!,
    publicKey: ik.public_key!,
    urlEndpoint: ik.url!
})

const uploadToImageKit = async (file: string | Buffer | ReadStream, fileName: string) => {
    const d = await imageKit.upload({
        file, fileName, useUniqueFileName: true
    })
    return d;
}

const generateThumbnailUrl = (path: string) => {
    const url = imageKit.url({
        path,
        transformation: [{
            height: ik.tn_height!,
            width: ik.tn_height!
        }]
    })

    return url
}

const deleteFromImageKit = async (filedId: string) => {
    const res = await imageKit.deleteFile(filedId)
    return res
}

export { uploadToImageKit, generateThumbnailUrl, deleteFromImageKit }