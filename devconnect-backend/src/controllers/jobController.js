import Job from "../models/jobModels.js";
import Application from "../models/applicationModels.js";

// Create Job Admin
export const createJOb = async (req, res) => {
  try {
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

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔥 UPDATED: GET ALL JOBS WITH SEARCH + FILTER
export const getJobs = async (req, res) => {
  try {
    const { search = "", location = "" } = req.query;

    let query = {};

    // 🔍 Search (title + company)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // 📍 Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



// Get Applications for job (admin only)
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ job: jobId })
      .populate("user", "name email")
      .populate("job", "title company");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};