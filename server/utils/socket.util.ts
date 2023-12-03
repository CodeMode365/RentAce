
import { Server } from "socket.io";
import { createServer } from "http";
import { Express } from "express";
import { prisma } from "../script"

export const initializeSocketIO = (app: Express) => {
    const server = createServer(app);
    const io = new Server(server);

    io.on("connection", (socket) => {

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    server.on("close", async () => {
        await prisma.$disconnect()
    })
    return { server, io };
};
