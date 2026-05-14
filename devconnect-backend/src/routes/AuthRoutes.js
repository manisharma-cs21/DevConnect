import express from "express"
import { forgotPassword, login, resetPassword, signup } from "../controllers/authController.js"
import { loginLimiter, signupLimiter } from "../middlewares/ratelimiter.js";

const router =express.Router();

router.post("/signup", signupLimiter, signup)
router.post("/login", loginLimiter, login)
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
export default router;