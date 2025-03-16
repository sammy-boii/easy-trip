// API URL based on current environment
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://easy-trip-3z43.onrender.com/api'

// API Endpoints
const ENDPOINTS = {
  TRIPS: `${API_URL}/trips`,
  BOOKINGS: `${API_URL}/bookings`
}

// Export constants
export { API_URL, ENDPOINTS }
