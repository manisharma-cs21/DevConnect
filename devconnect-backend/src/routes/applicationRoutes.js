import express from "express";
import {
  applyJob,
  getJobApplicants,
  getMyApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/apply/:id", protect, applyJob);
router.get("/my", protect, getMyApplications);
router.get("/job/:id", protect, authorizeRoles("admin"), getJobApplicants);
router.put("/:id/status", protect, authorizeRoles("admin"), updateApplicationStatus);

export default router;
