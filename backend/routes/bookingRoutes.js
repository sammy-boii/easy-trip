const express = require('express')
const router = express.Router()

// Import booking controller
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus
} = require('../controllers/bookingController')

// Routes
router.route('/').get(getBookings).post(createBooking)

router.route('/:id').get(getBookingById).put(updateBookingStatus)

module.exports = router
