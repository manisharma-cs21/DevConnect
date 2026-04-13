import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
};


// for mark as read 

export const markAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, read: false },
      { read: true }
    );

    res.json({ message: "All marked as read" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};