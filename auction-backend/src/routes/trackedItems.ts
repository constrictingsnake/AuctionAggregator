import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import process from "process";
import middleware from '../middleware/authMiddleware'

const prisma = new PrismaClient();

const router = express.Router();

router.post('/trackitem', middleware , (req, res) => {

    try {

        const {itemID, platform} = req.body;

        if(platform === "ebay") {

            

        } else if(platform === "yahoo") {

        }

    }catch(error) {
        return res.status(200).json({message: "Error in adding item to track"});
    }

});