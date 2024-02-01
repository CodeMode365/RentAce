'use server'

import { data } from "@/components/Operational/Home/Charts"
import { getAuthToken } from "./AuthActions"
import { revalidateTag } from "next/cache"

const url = `${process.env.SERVER_URL}/settings` as string


export const getNotificationSetting = async () => {
    const { token } = await getAuthToken()
    const res = await fetch(`${url}/notificationSetting`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
        next: {
            tags: ['notificationSetting']
        }
    })
    const response = await res.json()
    if (!res.ok) {
        throw new Error(response.message)
    }
    return data
}

export const updateNotificationSetting = async (setting: Record<string, boolean>) => {
    const { token } = await getAuthToken()
    const res = await fetch(`${url}/update/notificationSetting`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            SubscribeComments: setting.SubscribeComments,
            SubscribeMessages: setting.SubscribeMessages,
            SubscribeFollows: setting.SubscribeFollows,
            SubscribeApprovals: setting.SubscribeApprovals,
            SubscribeNews: setting.SubscribeNews,
        })
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    revalidateTag("notificationSetting")
    return data
}