import jwt, { JwtPayload } from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET as string

const generateToken = (userId: string): string => {
    const expiresIn = '1h';
    const payload = { userId };

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
}

const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded as JwtPayload;
    } catch (error) {
        return null;
    }
}

export { generateToken, verifyToken }