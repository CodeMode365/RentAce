import express, { Request, Response } from "express"
import {
    mediaRoute, spaceRoute, authRoute, userRoute,
    messageRoute, notificationRoute, ratingRoute, commentRoute, conversationRoute
} from "./routes";
import cors, { CorsOptions } from "cors"
import { prisma } from "./script"
import { initializeSocketIO } from "./utils/socket.util";

const app = express()
const { server, io } = initializeSocketIO(app)

async function main() {
    const PORT = process.env.PORT || 3500;
    const corsOptions: CorsOptions = {
        origin: "http://localhost:3000",
        methods: "*",
        credentials: true
    }

    app.use(express.json())
    app.use(cors(corsOptions))
    app.use("/api/v1/space", spaceRoute)
    app.use("/api/v1/auth", authRoute)
    app.use("/api/v1/media", mediaRoute)
    app.use("/api/v1/user", userRoute)
    app.use("/api/v1/conversation", conversationRoute)
    app.use("/api/v1/message", messageRoute)
    app.use("/api/v1/notification", notificationRoute)
    app.use("/api/v1/rating", ratingRoute)
    app.use("/api/v1/comment", commentRoute)

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "Hello world!" })
    })

    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found!" })
    })

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

export { io }