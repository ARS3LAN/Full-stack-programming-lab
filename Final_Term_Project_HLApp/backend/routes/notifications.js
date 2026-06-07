const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Patient = require('../models/Patient');
const { protect } = require('../middleware/auth');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
router.put('/read-all', protect, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Simulate/dispatch a custom notification (e.g. mobile alert reminder)
// @route   POST /api/notifications/simulate
// @access  Private
router.post('/simulate', protect, async (req, res) => {
  const { title, message, type } = req.body;

  try {
    const notification = await Notification.create({
      user: req.user._id,
      title: title || 'Simulated Reminder',
      message: message || 'This is a simulated alert for medication or checkup schedules.',
      type: type || 'system',
      emailSent: true,
      mobileAlertSent: true
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
