import { Request, Response } from 'express';
import prisma from '../db/prisma.js';

export const login = (req: Request,res: Response) => {
    res.send('Logged in successfully');
};

export const logout = (req: Request, res: Response) => {
    res.send('Logged out successfully');
};

export const signup = async (req: Request, res: Response) =>{
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({ error: "Please fill in all fields"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({ error: "Passwords don't match" });

        }

        const user = await prisma.user.findUnique({ where: {username}});

        if(user){
            return res.status(400).json({ error: "Username already exists" })
        }

    } catch (error) {
        
    }
};