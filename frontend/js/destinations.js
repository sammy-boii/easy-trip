import { ENDPOINTS } from './constants.js'

// Function to fetch trips from the API
export async function fetchTrips(search = '', region = '', priceRange = '') {
  try {
    const queryParams = new URLSearchParams()
    if (search) queryParams.append('search', search)
    if (region) queryParams.append('region', region)
    if (priceRange) queryParams.append('priceRange', priceRange)

    const response = await fetch(`${ENDPOINTS.TRIPS}?${queryParams}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching trips:', error)
    return []
  }
}

// Function to create rating stars
function createRatingStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  let starsHTML = ''

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHTML += '<i class="fas fa-star text-warning"></i>'
    } else if (i === fullStars && hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>'
    } else {
      starsHTML += '<i class="far fa-star text-warning"></i>'
    }
  }

  return starsHTML
}

// Function to create destination card
export function createDestinationCard(destination) {
  return `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm hover-shadow">
        <div class="position-relative">
          <img src="${destination.image}" class="card-img-top" alt="${
    destination.name
  }" style="height: 200px; object-fit: cover;">
          <div class="position-absolute top-0 end-0 m-2">
            <span class="badge bg-primary">${
              destination.region.charAt(0).toUpperCase() +
              destination.region.slice(1)
            }</span>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">${destination.name}</h5>
            <span class="h5 text-primary mb-0">$${
              destination.pricePerNight
            }</span>
          </div>
          <p class="text-muted small mb-2">${destination.country}</p>
          <div class="mb-2">
            ${createRatingStars(destination.rating)}
            <small class="text-muted">(${
              destination.ratingCount
            } reviews)</small>
          </div>
          <p class="card-text small mb-3">${destination.description.substring(
            0,
            150
          )}...</p>
          <div class="features small text-muted mb-3">
            ${Object.entries(destination.features)
              .map(
                ([key, value]) => `
              <span class="me-3">
                <i class="fas fa-${
                  key === 'duration' ? 'clock' : 'users'
                } me-1"></i>
                ${value}
              </span>
            `
              )
              .join('')}
          </div>
          <div class="d-grid">
            <a href="booking.html?id=${
              destination._id
            }" class="btn btn-primary">
              <i class="fas fa-calendar-check me-2"></i>Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}

// Function to filter destinations
async function filterDestinations() {
  const searchElement = document.getElementById('searchDestination')
  const regionElement = document.getElementById('regionFilter')
  const priceElement = document.getElementById('priceFilter')

  // If elements don't exist, we're probably on the home page
  if (!searchElement || !regionElement || !priceElement) {
    return
  }

  const searchQuery = searchElement.value.toLowerCase()
  const selectedRegion = regionElement.value
  const selectedPrice = priceElement.value

  // Construct query parameters
  const params = new URLSearchParams()

  if (searchQuery) {
    params.append('search', searchQuery)
  }

  if (selectedRegion) {
    params.append('region', selectedRegion)
  }

  if (selectedPrice) {
    switch (selectedPrice) {
      case 'budget':
        params.append('maxPrice', '150')
        break
      case 'moderate':
        params.append('minPrice', '150')
        params.append('maxPrice', '300')
        break
      case 'luxury':
        params.append('minPrice', '300')
        break
    }
  }

  try {
    const response = await fetch(`${ENDPOINTS.TRIPS}?${params}`)
    const destinations = await response.json()

    const destinationsGrid = document.getElementById('destinationsGrid')
    const resultCount = document.getElementById('resultCount')

    if (destinations.length === 0) {
      destinationsGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="text-muted">
            <i class="fas fa-search fa-3x mb-3"></i>
            <h4>No destinations found</h4>
            <p>Try adjusting your search criteria</p>
          </div>
        </div>
      `
    } else {
      destinationsGrid.innerHTML = destinations
        .map((destination) => createDestinationCard(destination))
        .join('')
    }

    resultCount.textContent = destinations.length
  } catch (error) {
    console.error('Error fetching destinations:', error)
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the destinations page by looking for the filters
  const isDestinationsPage =
    document.getElementById('searchDestination') !== null

  if (isDestinationsPage) {
    // Initial load of destinations
    filterDestinations()

    // Add event listeners for filters
    document
      .getElementById('searchDestination')
      .addEventListener('input', filterDestinations)
    document
      .getElementById('regionFilter')
      .addEventListener('change', filterDestinations)
    document
      .getElementById('priceFilter')
      .addEventListener('change', filterDestinations)
  }
})
