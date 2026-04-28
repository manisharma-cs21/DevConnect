import Application from "../models/applicationModels.js";
import Notification from "../models/notificationModel.js";

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


export const getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.id,
    })
      .populate(
        "user",
        "name email skills experience resume github"
      );

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/// for Shortlisting Applicants
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("job", "title");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ SAFE USER ID
    const userId =
      typeof application.user === "object"
        ? application.user._id
        : application.user;

    // ✅ SAFE MESSAGE
    const message = application.job?.title
      ? `Your application for ${application.job.title} has been ${status}`
      : `Your application status has been ${status}`;

    // 🔔 Save notification
    await Notification.create({
      user: userId,
      message,
    });

    // ⚡ Socket emit (safe)
    if (global.io) {
      global.io.to(userId.toString()).emit("notification", { message });
    }

    res.status(200).json(application);

  } catch (error) {
    console.log("ERROR:", error.message); // 👈 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};