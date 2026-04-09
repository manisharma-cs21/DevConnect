import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getReferrals, myReferrals, requestReferral, updateReferral } from "../controllers/referralController.js";

const router = express.Router();

router.post("/request", protect, requestReferral);
router.get("/", protect, getReferrals);
router.get("/my", protect, myReferrals);
router.put("/:id", protect, updateReferral);

export default router;