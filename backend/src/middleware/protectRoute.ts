import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import prisma from '../db/prisma.js';

interface DocodedToken extends JwtPayload {
    userId: string
};

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string
            }
        }
    }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const token = req.cookies.jwt;

        if (!token){
            return res.status(401).json({ error: 'Unauthorized -No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DocodedToken;

        if(!decoded){
            return res.status(401).json({ error: 'Unauthorized - Invalid Token'});
        };

        const user = await prisma.user.findUnique({
            where: {id : decoded.userId},
            select: { id: true, username: true, fullName: true, profilePic: true }
        });
        if(!user){
            return res.status(401).json({ error: 'User not found' });
        };
    
        req.user = user;
        next();
    } catch (error: any) {
        console.log('Error in protecRoute middleware');
        next(error)
    }
};