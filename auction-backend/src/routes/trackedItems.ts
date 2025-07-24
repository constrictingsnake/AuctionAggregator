import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import process from "process";
import middleware from '../middleware/authMiddleware'
import { getValidEbayToken } from "../utils/ebayToken";
import axios from 'axios';
import rateLimit from "express-rate-limit";

const prisma = new PrismaClient();

const router = express.Router();

const refreshLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 5,
    keyGenerator: (req, res) => {
        
        if (req.user && req.user.userId) {
            return `user-${req.user.userId}`;
        }
        
        return req.ip || 'unknown-ip';
    },
    message: {
        message: "Too many refresh requests, please try again later."
    }
});

router.post('/trackitem', middleware , async (req, res) => {

    try {

        const {itemID, shopPlatform} = req.body;

        if(shopPlatform === "ebay") {

            const token = await getValidEbayToken();

            if(!itemID) {
                return res.status(400).json({message: "Invalid url/ebay item"});
            }

            const response = await axios.get(
                `https://api.ebay.com/buy/browse/v1/item/${itemID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const itemData = response.data;
            const endTime = itemData.itemEndDate ? new Date(itemData.itemEndDate) : undefined;

            const status = endTime && endTime.getTime() < Date.now() ? 'ENDED' : 'ACTIVE';
            const newTrackedItem = await prisma.trackedItem.create({

                data: {
                    userId: req.user!.userId,
                    platform: 'ebay',
                    itemUrl: itemData.itemWebUrl,
                    itemId: itemData.itemId,
                    title: itemData.title,
                    currentPrice: parseFloat(itemData.price.value),
                    currencyVal: itemData.price.currency,
                    status: status,
                    endTime: endTime,
                    sellerFeedback: itemData.seller.feedbackScore,
                    sellerFeedbackPercentage: itemData.seller.feedbackPercentage,
                    sellerName: itemData.seller.username,
                    metadata: {
                        condition: itemData.condition,
                        imageUrl: itemData.image?.imageUrl,
                        additionalImages: itemData.additionalImages?.map((img: { imageUrl: string }) => img.imageUrl) || [],
                        
                        
                        

                    }
                }


            }

            );

            

        } else if(shopPlatform === "yahoo") {

        } else {
            return res.status(200).json({message: "Unsupported platform"});
        }

    }catch(error) {
        return res.status(200).json({message: "Error in adding item to track"});
    }

});

router.post('/refreshItem', middleware, refreshLimiter,  async (req, res) => {

    try {
        const { TrackedItemId } = req.body;

        const trackedItem = await prisma.trackedItem.findUnique({
            where: { id: TrackedItemId, userId: req.user!.userId }
        });

        if (!trackedItem) {
            return res.status(404).json({ message: "Tracked item not found" });
        }
        let response;
        if (trackedItem.platform === 'ebay') {

            const token = await getValidEbayToken();
            response = await axios.get(`https://api.ebay.com/buy/browse/v1/item/${trackedItem.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        } else {
            // IMPLEMENT YAHOO API
            response = {message: "implement yahoo"};
        }


        const itemData = response.data;

        const status = trackedItem.endTime && trackedItem.endTime.getTime() < Date.now() ? 'ENDED' : 'ACTIVE';

        prisma.trackedItem.update({
            where: {id: trackedItem.id},
            data: {
                currentPrice: parseFloat(itemData.price.value),
                title: itemData.title,
                sellerFeedback: itemData.seller.feedbackScore,
                sellerFeedbackPercentage: itemData.seller.feedbackPercentage,
                lastChecked: new Date()
            }
        });


    } catch (error) {
        return res.status(200).json({ message: "Error in updating item" });
    }

})

router.get('/trackedItem/:id', middleware, async(req, res) => {

    try {

        const trackedItem = await prisma.trackedItem.findFirst({
            where: {
                id: parseInt(req.params.id),
                userId: req.user!.userId
            }
        });

        if(!trackedItem) {
            res.status(401).json({message: "Item not found"});
        }

        return res.status(200).json(trackedItem);

    } catch (error) {
        return res.status(501).json({message: "Error finding item"});
    }

})

router.get('/trackedItems', middleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = 20;

        const trackedItems = await prisma.trackedItem.findMany({
            where: {
                userId: req.user!.userId
            },
            orderBy: {
                lastChecked: 'desc'
            },
            skip: (page - 1) * pageSize,
            take: pageSize
        });

        const totalCount = await prisma.trackedItem.count({
            where: {
                userId: req.user!.userId
            }
        });

        return res.status(200).json({
            page,
            pageSize,
            totalCount, 
            trackedItems
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error finding items" });
    }
});

router.delete('/trackedItems/:id', middleware, async (req, res) => {
    try {
        
        const trackedItem = await prisma.trackedItem.findFirst({
            where: {
                id: parseInt(req.params.id),
                userId: req.user!.userId
            }
        });

        if (!trackedItem) {
            return res.status(404).json({ message: "Tracked item not found or not owned by user" });
        }

        
        await prisma.trackedItem.delete({
            where: {
                id: trackedItem.id
            }
        });

        return res.status(200).json({ message: "Tracked item deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting tracked item" });
    }
});