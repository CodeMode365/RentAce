import express, { Request, Response } from "express"
import cors, { CorsOptions } from "cors"
import { prisma } from "./script"
import { initializeSocketIO } from "./utils/socket.util";
import allRoutes from "./routes"
import { limiter } from "./utils/reqlimiter.util";

const app = express()

async function main() {
    const PORT = process.env.PORT || 3700;
    const corsOptions: CorsOptions = {
        origin: "http://localhost:3000",
        methods: "*",
        credentials: true,
        allowedHeaders: ["*", "Authorization"]
    }

    app.use(express.json())
    app.use(limiter)
    app.use(cors(corsOptions))
    app.use("/api/v1", allRoutes)


    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "Hello world!" })
    })

    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found!" })
    })

    const { server, io } = initializeSocketIO(app)
    server.listen(PORT, () => {
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

// export { io }