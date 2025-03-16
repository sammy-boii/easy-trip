const express = require('express')
const router = express.Router()
const {
  getTrips,
  getTripById,
  createTrip,
  updateTripRating
} = require('../controllers/tripController')

router.route('/').get(getTrips).post(createTrip)
router.route('/:id').get(getTripById)
router.route('/:id/rating').put(updateTripRating)

module.exports = router
