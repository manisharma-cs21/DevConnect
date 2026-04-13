import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getProfile, getUserById, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/:id", protect, getUserById);

export default router;