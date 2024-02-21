
import { Server } from "socket.io";
import { createServer } from "http";
import { Express } from "express";
import { prisma } from "../script"

export const initializeSocketIO = (app: Express) => {
    console.log("socket here")
    const server = createServer(app);
    const io = new Server(server, {
        transports: ["websocket"],
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("connected user with id:", socket.id)

        socket.on("message", (message: string) => {
            console.log("messaging", message)
            io.emit("message", message)
        })

        socket.on("joinConversation", (convId: string) => {
            socket.join(`conversation-${convId}`)
            console.log("joined user", convId)
        })

        socket.on("sendMessage", async (convId: string, content: string) => {
            io.to(`conversation-${convId}`).emit("newMessage", content)
        })

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    server.on("close", async () => {
        console.log("socket closed!")
        await prisma.$disconnect()
    })
    return { server, io };
};
