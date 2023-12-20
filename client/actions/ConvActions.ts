'use server'

import { revalidatePath, revalidateTag } from "next/cache"

const url = `${process.env.SERVER_URL}/conversation` as string

export const getExisitngConv = async (token: string) => {
    const res = await fetch(`${url}/my-coverasations`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
        next: {
            tags: ['my-coverasations']
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}


export const delConversation = async (token: string, conversationId: string) => {
    const res = await fetch(`${url}/${conversationId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
    })

    revalidateTag("my-coverasations")
    
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}