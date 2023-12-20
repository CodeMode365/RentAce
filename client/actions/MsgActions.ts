'use server'

// import { revalidatePath, revalidateTag } from "next/cache"

const url = `${process.env.SERVER_URL}/message` as string

export const getMessages = async (token: string, convId: string, page: number, limit: number = 50) => {
    const res = await fetch(`${url}/${convId}?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
        next: {
            tags: ['messages', convId]
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}


export const sendMessage = async (token: string, message: string, conversationId: string) => {
    const res = await fetch(`${url}/send`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            message,
            convId: conversationId
        }),
        cache: "no-cache",
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}
