require('dotenv').config()

const API_URL = process.env.API_URL || 'http://localhost:5000/api'

// API Endpoints
const ENDPOINTS = {
  TRIPS: `${API_URL}/trips`,
  BOOKINGS: `${API_URL}/bookings`
}

console.log(window.location.hostname)

// Export constants
export { API_URL, ENDPOINTS }
