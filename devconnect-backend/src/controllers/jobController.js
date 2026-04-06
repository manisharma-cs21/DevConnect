import { application } from "express";
import Job from "../models/jobModels.js";
import Application from "../models/applicationModels.js";


// Create Job Admin
export const createJOb=async (req,res)=>{
    try{
         const { title, company, description, location } = req.body;
         
         
         if (!title || !company || !description) {
         return res.status(400).json({ message: "All fields required" });
          }
        
        const job = await Job.create({
          title,
          company,
          description,
          location,
          createdBy: req.user._id,
        });
        res.status(201).json({
             message: "Job created successfully",
             job,
       });
    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET all jobs 
export const getJobs=async(req,res)=>{
    try{
     const jobs=await Job.find().populate("createdBy","name email");
     res.status(200).json(jobs);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }

}

// Get Application for job admin only

export const getApplicants = async (req,res)=>{
    try{
        const jobId=req.params.id;
        const applications=await Application.find({job:jobId})
        .populate("user","name email")
        .populate("job","title company")
        res.status(200).json(applications);
    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}