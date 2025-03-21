// API URL based on current environment
const API_URL =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://easy-trip-server.vercel.app/api'

// API Endpoints
const ENDPOINTS = {
  TRIPS: `${API_URL}/trips`,
  BOOKINGS: `${API_URL}/bookings`
}

// Export constants
export { API_URL, ENDPOINTS }
