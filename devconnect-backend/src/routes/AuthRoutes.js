import express from "express"
import { login, signup } from "../controllers/authController.js"
import { loginLimiter, signupLimiter } from "../middlewares/ratelimiter.js";

const router =express.Router();

router.post("/signup", signupLimiter, signup)
router.post("/login", loginLimiter, login)
export default router;