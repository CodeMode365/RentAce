'use server'

import { iAcutalImages } from "@/components/Modal/AddSpaceModal/Steps/Step2";

// const url = `${process.env.SERVER_URL}/space` as string

const url = `${process.env.SERVER_URL}/media` as string;



export const uploadMedia = async (image: File, token: string) => {
    const formData = new FormData();
    console.log(image, token)
    if (image) {
        formData.append("image", image);
        const res = await fetch(`${url}/upload`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    } else {
        throw new Error("Image missing!");
    }
};


export const deleteMedia = async (image: iAcutalImages, token: string) => {
    const res = await fetch(`${url}/delete?fileId=${image.fileId}&id=${image.id}`, {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}
