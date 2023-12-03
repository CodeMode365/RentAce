import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token.util";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authKey = req.header('Authorization') as string;

    if (!authKey) {
        console.log('no token')
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authKey.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        console.log('error decording')
        return res.status(500).json({ message: "Error validating Token!" })
    }

    req.params.userId = decoded.userId
    next()
};

export default authenticateToken