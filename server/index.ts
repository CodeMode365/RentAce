import express, { Request, Response } from "express"
import { prisma } from "./script"
import PinRoute from "./routes/pin"
import UserRoute from "./routes/user"

async function main() {
    const PORT = process.env.PORT || 3500;
    const app = express()

        .use(express.json())
        .use("/api/pin", PinRoute)
        .use("/api/user", UserRoute)

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