
import express from "express";
import multer from "multer";
import { getProfile } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateUser, getProfile);

export default router;
