import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction ) => {
    console.log(error.message);
    res.status(500).json({
        error:'Internal Server Error',
    });
    next(error);
};