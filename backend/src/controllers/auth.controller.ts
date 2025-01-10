import { NextFunction, Request, Response } from 'express';
import prisma from '../db/prisma.js';
import bcryptjs from 'bcryptjs';
import generateToken from '../utils/generateTokens.js';

export const getMe = async (req: Request,res: Response,next: NextFunction): Promise<any> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id}
        });
        if(!user){
            return res.status(401).json({error: 'User not found'});
        };
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
        
    } catch (error: any) {
        console.log('Error in getMe controller');
        next(error);
    }
};

export const login = async (req: Request,res: Response,next: NextFunction): Promise<any> => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where:{username:username}
        });
        
        if (!user){
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }
        const isPaswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPaswordCorrect){
            return res.status(400).json({error: 'Invalid credentials'})
        };
        generateToken(user.id, res);
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
        

    } catch (error: any) {
        console.log('Error in login controller')
        next(error);
        
        
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
            res.cookie('jwt', '',{ maxAge: 0 });
            res.status(200).json({ message: 'Logged out succesfully' });

    } catch (error: any) {
        console.log('Error in logout controller')
        next(error);
    }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //  https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic,

            }
        });


        if(newUser){
            generateToken(newUser.id, res);

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });

        }
        else {
            res.status(400).json({
                error: "Invalid data"
            });
        }

        
    } catch (error: any) {
        next(error);
    }
};