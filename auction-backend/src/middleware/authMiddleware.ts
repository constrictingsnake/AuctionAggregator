import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import process from "process";

const prima = new PrismaClient();
const router = express.Router();

router.post('/authenticate', async(req, res, next) => {

    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(200).json({message: "No token provided"});
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET!);

        next();
        

    } catch(error) {
        return res.status(401).json({message: "Invalid or expired token"})
    }

});