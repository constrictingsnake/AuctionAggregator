import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import process from "process";
import middleware from '../middleware/authMiddleware'
import { getValidEbayToken } from "../utils/ebayToken";
import axios from 'axios';

const prisma = new PrismaClient();

const router = express.Router();

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
                    metadata: {
                        condition: itemData.condition,
                        imageUrl: itemData.image?.imageUrl,
                        additionalImages: itemData.additionalImages?.map((img: { imageUrl: string }) => img.imageUrl) || [],
                        sellerUsername: itemData.seller.username,
                        sellerFeedback: itemData.seller.feedbackScore,
                        sellerFeedbackPercentage: itemData.seller.feedbackPercentage

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