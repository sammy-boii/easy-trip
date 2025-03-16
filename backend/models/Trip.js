const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    region: {
      type: String,
      required: true,
      enum: ['europe', 'asia', 'americas', 'middleeast', 'africa'],
      lowercase: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0
    },
    ratingCount: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    highlights: [
      {
        type: String,
        required: true,
        trim: true
      }
    ],
    features: {
      duration: {
        type: String,
        required: true,
        trim: true
      },
      groupSize: {
        type: String,
        required: true,
        trim: true
      },
      spots: {
        type: String,
        required: true,
        trim: true
      }
    }
  },
  {
    timestamps: true
  }
)

// Add indexes for better search performance
tripSchema.index({ name: 'text', country: 'text', description: 'text' })
tripSchema.index({ region: 1, pricePerNight: 1 })

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip
