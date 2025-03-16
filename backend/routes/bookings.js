const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const { protect, authorize } = require('../middleware/auth')

// Get all bookings - Admin only
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email')
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

// Get user bookings
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

// Create new booking
router.post('/', protect, async (req, res) => {
  try {
    req.body.user = req.user.id
    const booking = await Booking.create(req.body)
    res.status(201).json({
      success: true,
      data: booking
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

// Update booking status - Admin only
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    res.status(200).json({
      success: true,
      data: booking
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

// Cancel booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      })
    }

    await booking.remove()

    res.status(200).json({
      success: true,
      data: {}
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router
