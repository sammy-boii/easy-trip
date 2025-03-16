const Booking = require('../models/Booking')

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body)
    res.status(201).json(booking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Public
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (booking) {
      res.json(booking)
    } else {
      res.status(404).json({ message: 'Booking not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Public
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (booking) {
      booking.status = req.body.status || booking.status
      const updatedBooking = await booking.save()
      res.json(updatedBooking)
    } else {
      res.status(404).json({ message: 'Booking not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus
}
