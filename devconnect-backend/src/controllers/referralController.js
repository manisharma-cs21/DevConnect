import Referral from "../models/referralModel.js";
import Notification from "../models/notificationModel.js";
import { io } from "../../server.js"; // adjust path

// REQUEST REFERRAL
export const requestReferral = async (req, res) => {
  try {
    const { jobId } = req.body;

    const existing = await Referral.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already requested",
      });
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


// GET ALL
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


// UPDATE STATUS
export const updateReferral = async (req, res) => {
  try {
    const { status } = req.body;

    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    // 🔥 prevent duplicate update
    if (referral.status === status) {
      return res.json(referral);
    }

    referral.status = status;
    await referral.save();

    await referral.populate("job");

    const message = `Your referral request for ${referral.job.title} was ${status}`;

    // create notification
    const notification = await Notification.create({
      user: referral.user,
      message,
    });

    // 🔥 real-time emit
    io.to(referral.user.toString()).emit("notification", notification);

    res.json(referral);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// MY REFERRALS
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