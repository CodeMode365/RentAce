'use server'

import { IUserInfo } from "@/types/user"
import { revalidateTag } from "next/cache"

const url = `${process.env.SERVER_URL}/users` as string

export const getUserInfo = async (token: string) => {
    const res = await fetch(`${url}/userInfo`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
        next: {
            tags: ['userInfo']
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}

export const updateUserInfo = async (userInfo: IUserInfo, token: string) => {
    const res = await fetch(`${url}/update/userInfo`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message)
    }

    revalidateTag("userInfo")
    return data
}