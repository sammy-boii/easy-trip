import { fetchTrips, createDestinationCard } from './destinations.js'

// Load popular destinations on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const trips = await fetchTrips()
    const popularDestinations = trips.slice(0, 6) // Get first 6 destinations
    const destinationsContainer = document.getElementById('popularDestinations')

    destinationsContainer.innerHTML = popularDestinations
      .map((destination) => createDestinationCard(destination))
      .join('')
  } catch (error) {
    console.error('Error loading popular destinations:', error)
  }
})
