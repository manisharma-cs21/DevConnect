import express from "express";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import protect from "../middlewares/authMiddleware.js";
import { createJOb, getJobs } from "../controllers/jobController.js";
import { getApplicants } from "../controllers/jobController.js";


const router=express.Router();

router.post("/",protect,authorizeRoles("admin"),createJOb);
router.get("/",getJobs);
router.get("/:id/applicants",protect,authorizeRoles("admin"),getApplicants)


export default router;