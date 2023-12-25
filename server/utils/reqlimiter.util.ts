import rateLimit from "express-rate-limit";


const limiter = rateLimit({
    windowMs: 5 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "Too many requests!",
    handler: (req, res, next) => {
        res.status(429).json({ message: "To many requests,\n Please wait a while!" })
    },
})

export { limiter }