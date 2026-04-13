import Referral from "../models/referralModel.js";
import Notification from "../models/notificationModel.js";

// REQUEST REFERRAL
export const requestReferral = async (req, res) => {
  try {
    const { jobId } = req.body;

    // prevent duplicate (same user same job)
    const existing = await Referral.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already requested" });
    }

    const referral = await Referral.create({
      user: req.user._id,
      job: jobId,
      status: "pending",
    });

    res.status(201).json(referral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN GET ALL REFERRALS
export const getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find()
      .populate("user", "name email")
      .populate("job", "title company");

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN UPDATE STATUS
export const updateReferral = async (req, res) => {
  try {
    const { status } = req.body;

    const referral = await Referral.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("job");

    // create notification
    await Notification.create({
      user: referral.user,
      message: `Your referral request for ${referral.job.title} was ${status}`,
    });

    // for real-time notification
    global.io.to(referral.user.toString()).emit("notification", {
      message: `Your referral request for ${referral.job.title} was ${status}`,
    });

    res.json(referral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER MY REFERRALS
export const myReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({
      user: req.user._id,
    })
      .populate("job", "title company")
      .populate("user", "name email");

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
