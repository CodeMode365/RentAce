import { Request, Response, NextFunction } from "express";

const routePaster = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.url , req.body)
    next()
};

export default routePaster