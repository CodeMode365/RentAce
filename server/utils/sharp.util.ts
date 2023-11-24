import sharp, { FitEnum } from "sharp";
import vars from "../config/vars.config"

const { sharp: s } = vars;

const compression_level = parseInt(s.compression_level);
const height = parseInt(s.image_height);
const width = parseInt(s.image_width);
const fit: FitEnum | undefined = s.image_fit as unknown as FitEnum;

const compressImage = async (data: Buffer) => {
    const d = await sharp(data).resize({
        height,
        width,
        // fit: undefined,
    }).webp({ quality: compression_level }).toBuffer();

    return d;
};


export { compressImage }