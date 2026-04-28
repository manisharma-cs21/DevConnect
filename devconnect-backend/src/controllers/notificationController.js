import Notification from "../models/notificationModel.js";

// GET ALL NOTIFICATIONS
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// MARK ALL AS READ
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


// CREATE NOTIFICATION (REUSABLE FUNCTION)
export const createNotification = async (userId, message) => {
  try {
    const notification = await Notification.create({
      user: userId,
      message,
    });

    return notification;

  } catch (error) {
    console.log("Notification Error:", error.message);
  }
};