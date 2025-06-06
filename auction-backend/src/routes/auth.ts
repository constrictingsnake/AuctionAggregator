import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import process from "process";

const prisma = new PrismaClient();
const router = express.Router();

const SALT_ROUNDS = 10

router.post('/register', async (req, res) => {
try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Error; email and/or password is blank"});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email},
        })

        if(existingUser) {
            return res.status(409).json({message: "Error: email address already has an account associated with it"})
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        });

    } catch (error) {
        console.error('Error in /register: ', error);
        res.status(500).json({message: "Internal server error"})
    }
});

router.post('/login', async(req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Error: email and/or password is blank"});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if(!existingUser) {
            return res.status(409).json({message: "A user with that email address doesn't exist"});
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const isValid = await bcrypt.compare(password, existingUser.password);
        if(!isValid) {
            return res.status(401).json({message: "Invalid email or password"});
        } 

        const token = jwt.sign(
            {userId: existingUser.id, email: existingUser.email},
            process.env.JWT_SECRET!,
            { expiresIn: '1h'}
        );
        res.status(200).json({ token })

    } catch (error) {
        console.error('Error in /login: ', error);
        res.status(500).json({message: "Internal server error"})
    }
    

});

export default router;