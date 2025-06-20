const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// Create attendance
router.post('/', async (req, res) => {
  const { user, subject, date, status, remarks } = req.body;
  try {
    const record = new Attendance({ user, subject, date, status, remarks });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to save attendance' });
  }
});

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const records = await Attendance.find().populate('user', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch attendance' });
  }
});

// Update attendance by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update attendance' });
  }
});

// Delete attendance by ID
router.delete('/:id', async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete attendance' });
  }
});

module.exports = router;
