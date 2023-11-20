import express, { Request, Response } from "express"
import { prisma } from "./script"


async function main() {
    const PORT = process.env.PORT || 3500;
    const app = express()

        .get("/", (req: Request, res: Response) => {
            res.send("Hello world")
        })

        .listen(PORT, () => {
            console.log(`Server on: http://localhost:${PORT}`)
        })
}



main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })