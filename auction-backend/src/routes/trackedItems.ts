import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import process from "process";

const prisma = new PrismaClient();

const router = express.Router();

