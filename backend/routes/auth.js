const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { protect } = require('../middleware/auth')

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Create user
    const user = await User.create({
      name,
      email,
      password
    })

    // Create token
    const token = user.getSignedJwtToken()

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Create token
    const token = user.getSignedJwtToken()

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

// Get current logged in user
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router
