const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const tripRoutes = require('./routes/tripRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/trips', tripRoutes)
app.use('/api/bookings', bookingRoutes)

// Error handling middleware
app.use((err, _req, res, _next) => {
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
