'use server'

import { IUserInfo } from "@/types/user"
import { revalidateTag } from "next/cache"
import { getAuthToken } from "./AuthActions"
import { z } from "zod"

const url = `${process.env.SERVER_URL}/users` as string

const userInfoSchema = z.object({
    phone: z.string(),
    Address: z.string(),
    Country: z.string(),
    State: z.string(),
    City: z.string(),
    Zip: z.string(),
    // bio: z.string()
})

export const getUserInfo = async (token: string) => {
    const res = await fetch(`${url}/userInfo`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "default",
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

export const updateUserInfo = async (formData: FormData) => {
    const { token } = await getAuthToken()

    const userInfo = {
        phone: formData.get('phone'),
        State: formData.get('state'),
        Address: formData.get('address'),
        Country: formData.get('country'),
        Zip: formData.get('zip'),
        City: formData.get('city'),
    }


    const validatedFields = userInfoSchema.safeParse(userInfo)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

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
