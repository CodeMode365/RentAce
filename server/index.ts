import express, { Request, Response } from "express"
import { mediaRoute, pinRoute, authRoute, userRoute } from "./routes";
import cors, { CorsOptions } from "cors"
import { prisma } from "./script"

async function main() {
    const PORT = process.env.PORT || 3500;
    const corsOptions: CorsOptions = {
        origin: "http://localhost:3000",
        methods: "*",
        credentials: true
    }
    const app = express()

        .use(express.json())
        .use(cors(corsOptions))
        .use("/api/pin", pinRoute)
        .use("/api/auth", authRoute)
        .use("/api/media", mediaRoute)
        .use("/api/user", userRoute)

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