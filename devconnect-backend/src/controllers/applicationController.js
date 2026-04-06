import Application from "../models/applicationModels.js";

// Apply Job
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // check duplicate apply
    const alreadyApplied = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      job: jobId,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// find my Application
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("job", "title company location");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
