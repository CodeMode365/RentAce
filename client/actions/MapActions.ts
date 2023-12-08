'use server'

import { revalidatePath } from "next/cache"

const token = process.env.MAPBOX_TOKEN as string
const endpoint = process.env.MAPBOX_ENDPOINT as string

export const getDirections = async (source: { lng: number; lat: number }, destination: { lng: number; lat: number }, mode: string = "driving",) => {

    const path = `${endpoint}/directions/v5/mapbox/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${token}`

    const res = await fetch(path, {
        method: "GET"
    })

    const data = await res.json()
    if (!res.ok) {
        console.log("Errorr", data)
        return Error(data)
    }

    return data
}