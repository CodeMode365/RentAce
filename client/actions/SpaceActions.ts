'use server'

import { iAcutalImages } from "@/components/Modal/AddSpaceModal/Steps/Step2"
import { iSpaceData } from "@/types/space"
import { revalidatePath, revalidateTag } from "next/cache"
import { getAuthToken } from "./AuthActions"

const url = `${process.env.SERVER_URL}/space` as string

export const getAllSpaces = async () => {
    const { token } = await getAuthToken()
    const res = await fetch(`${url}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
        next: {
            tags: ['allSpaces']
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}

export const getMySpaces = async () => {
    const { token } = await getAuthToken()
    const res = await fetch(`${url}/self`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
        next: {
            tags: ['mySpaces']
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}

export const getSingleSpace = async (spaceId: string, fulldetail: boolean = false) => {
    const { token } = await getAuthToken()
    const res = await fetch(`${url}/${spaceId}?fulldetail=${fulldetail}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        // cache: "no-cache",
        next: {
            tags: ['spaces', `${spaceId}`],
            revalidate: 20,
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}

export const deleteSpace = async (spaceId: string) => {
    const { token } = await getAuthToken()
    const res = await fetch(`${url}/remove/${spaceId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        next: {
            revalidate: 20,
        },
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    revalidateTag('spaces')
    revalidatePath('/')
    return data
}


interface iPostingData extends Omit<iSpaceData, 'owner' | 'description' | 'images'> {
    desc: string;
    ownerName: string;
}

export const postNewSpace = async (postingData: iPostingData, actualImages: iAcutalImages[], pos: { lng: number, lat: number }) => {
    const { token } = await getAuthToken()
    const { amount, desc, ownerName, spaceType, payType, title, } = postingData
    const res = await fetch(`${url}/add`, {
        method: "POST",
        body: JSON.stringify({
            lng: pos.lng, lat: pos.lat, ownerName, amount, desc,
            spaceType: spaceType.toUpperCase(),
            payType: payType.toUpperCase(), title,
            images: actualImages
        }),
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message)
    }

    revalidateTag('spaces')
    revalidatePath('/')
    // revalidatePath(['mySpaces', 'allSpaces'])
    return data
}

