// Determine if we're in production based on the URL
const isProduction = window.location.hostname !== 'localhost'

// API URLs
const API_URL = isProduction
  ? '/api' // In production, use relative path
  : 'http://localhost:5000/api' // In development, use localhost

// API Endpoints
const ENDPOINTS = {
  TRIPS: `${API_URL}/trips`,
  BOOKINGS: `${API_URL}/bookings`
}

// Export constants
export { API_URL, ENDPOINTS }
