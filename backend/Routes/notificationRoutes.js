const express = require("express");
const {
  createNotification,
  getNotifications,
  updateNotification,
  markAsRead,
  deleteNotification,
  markAllAsRead,
} = require("../Controllers/notificationController");

const router = express.Router();

// GET /api/notifications - Get all notifications
router.get("/", getNotifications);

// POST /api/notifications - Create new notification
router.post("/", createNotification);

// PUT /api/notifications/:id - Update notification (including mark as read)
router.put("/:id", updateNotification);

// PUT /api/notifications/:id/read - Mark notification as read (alternative endpoint)
router.put("/:id/read", markAsRead);

// DELETE /api/notifications/:id - Delete notification
router.delete("/:id", deleteNotification);

// PUT /api/notifications/mark-all-read - Mark all notifications as read
router.put("/mark-all-read", markAllAsRead);

module.exports = router;
