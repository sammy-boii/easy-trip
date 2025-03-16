const Trip = require('../models/Trip')

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
const getTrips = async (req, res) => {
  try {
    const { search, region, priceRange } = req.query
    let query = {}

    // Search filter
    if (search) {
      query.$text = { $search: search }
    }

    // Region filter
    if (region) {
      query.region = region.toLowerCase()
    }

    // Price range filter
    if (priceRange) {
      switch (priceRange) {
        case 'budget':
          query.pricePerNight = { $lt: 150 }
          break
        case 'moderate':
          query.pricePerNight = { $gte: 150, $lte: 250 }
          break
        case 'luxury':
          query.pricePerNight = { $gt: 250 }
          break
      }
    }

    const trips = await Trip.find(query)
    res.json(trips)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
    if (trip) {
      res.json(trip)
    } else {
      res.status(404).json({ message: 'Trip not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a trip
// @route   POST /api/trips
// @access  Public
const createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body)
    const createdTrip = await trip.save()
    res.status(201).json(createdTrip)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update trip rating
// @route   PUT /api/trips/:id/rating
// @access  Public
const updateTripRating = async (req, res) => {
  try {
    const { rating } = req.body
    const trip = await Trip.findById(req.params.id)

    if (trip) {
      const newRatingCount = trip.ratingCount + 1
      const newRating =
        (trip.rating * trip.ratingCount + rating) / newRatingCount

      trip.rating = Number(newRating.toFixed(1))
      trip.ratingCount = newRatingCount

      const updatedTrip = await trip.save()
      res.json(updatedTrip)
    } else {
      res.status(404).json({ message: 'Trip not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getTrips,
  getTripById,
  createTrip,
  updateTripRating
}
