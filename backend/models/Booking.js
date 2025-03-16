const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true
    },
    trip: {
      name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      pricePerNight: {
        type: Number,
        required: true
      }
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1
    },
    roomType: {
      type: String,
      required: true,
      enum: ['standard', 'deluxe', 'suite', 'villa']
    },
    mealPlan: {
      type: String,
      required: true,
      enum: [
        'room_only',
        'breakfast',
        'half_board',
        'full_board',
        'all_inclusive'
      ]
    },
    transportation: {
      type: String,
      required: true,
      enum: ['none', 'shared', 'private', 'luxury']
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Booking', bookingSchema)
