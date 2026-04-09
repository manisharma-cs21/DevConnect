import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
};