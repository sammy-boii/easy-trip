// Set minimum date for date inputs
const today = new Date().toISOString().split('T')[0]
document.getElementById('startDate').min = today
document.getElementById('endDate').min = today

// Handle date validation
const startDateInput = document.getElementById('startDate')
const endDateInput = document.getElementById('endDate')

startDateInput.addEventListener('change', () => {
  endDateInput.min = startDateInput.value
  if (endDateInput.value && endDateInput.value < startDateInput.value) {
    endDateInput.value = startDateInput.value
  }
})

// Fetch trips from the API
async function fetchTrips() {
  try {
    const response = await fetch('http://localhost:5000/api/trips')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching trips:', error)
    return []
  }
}

// Fetch a specific trip from the API
async function fetchTrip(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/trips/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch trip details')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching trip:', error)
    return null
  }
}

// Create rating stars
function createRatingStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  let starsHtml = ''

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<i class="fas fa-star text-warning"></i>'
    } else if (i === fullStars && hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>'
    } else {
      starsHtml += '<i class="far fa-star text-warning"></i>'
    }
  }

  return starsHtml
}

// Display trip summary
function displayTripSummary(trip) {
  const tripSummaryContainer = document.getElementById('trip-summary')
  if (!tripSummaryContainer) {
    console.error('Trip summary container not found')
    return
  }

  const html = `
    <div class="container my-4">
      <div class="card shadow border-0 rounded-3 overflow-hidden">
        <div class="row g-0">
          <div class="col-lg-5">
            <div class="position-relative h-100">
              <img src="${trip.image}" class="w-100 h-100" alt="${
    trip.name
  }" style="object-fit: cover;">
              <div class="position-absolute bottom-0 start-0 w-100 p-3" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
                <h2 class="card-title text-white mb-0">${trip.name}</h2>
                <p class="text-white mb-2"><i class="fas fa-map-marker-alt me-2"></i>${
                  trip.country
                }</p>
                <div class="d-flex align-items-center">
                  <div class="me-2">
                    ${createRatingStars(trip.rating)}
                  </div>
                  <small class="text-white">(${
                    trip.ratingCount
                  } reviews)</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-start mb-4">
                <div class="flex-grow-1">
                  <p 
                  style="font-size: 1.1rem;"
                  class="mb-3">${trip.description}</p>
                  <button class="btn btn-link text-primary p-0" data-bs-toggle="modal" data-bs-target="#tripDetailsModal">
                    <i class="fas fa-info-circle me-1"></i>View full details
                  </button>
                </div>
                <div class="text-end ms-4">
                  <h3 class="text-primary mb-0">$${trip.pricePerNight}</h3>
                  <small class="text-muted">per night</small>
                </div>
              </div>

              <div class="row g-4">
                <div class="col-md-6">
                  <div class="card bg-light border-0 h-100">
                    <div class="card-body">
                      <h5 class="card-title d-flex align-items-center mb-3">
                        <i class="fas fa-list-ul me-2 text-primary"></i>Features
                      </h5>
                      <ul class="list-unstyled mb-0">
                        <li class="mb-3 d-flex align-items-center">
                          <i class="fas fa-clock text-success me-2"></i>
                          <div>
                            <strong>Duration</strong>
                            <div class="text-muted">${
                              trip.features.duration
                            }</div>
                          </div>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                          <i class="fas fa-users text-success me-2"></i>
                          <div>
                            <strong>Group Size</strong>
                            <div class="text-muted">${
                              trip.features.groupSize
                            }</div>
                          </div>
                        </li>
                        <li class="d-flex align-items-center">
                          <i class="fas fa-ticket-alt text-success me-2"></i>
                          <div>
                            <strong>Available Spots</strong>
                            <div class="text-muted">${
                              trip.features.spots
                            } remaining</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card bg-light border-0 h-100">
                    <div class="card-body">
                      <h5 class="card-title d-flex align-items-center mb-3">
                        <i class="fas fa-star me-2 text-primary"></i>Highlights
                      </h5>
                      <ul class="list-unstyled mb-0">
                        ${trip.highlights
                          .map(
                            (highlight) => `
                          <li class="mb-2 d-flex">
                            <i class="fas fa-check-circle text-success me-2 mt-1"></i>
                            <span>${highlight}</span>
                          </li>`
                          )
                          .join('')}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trip Details Modal -->
    <div class="modal fade" id="tripDetailsModal" tabindex="-1" aria-labelledby="tripDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header border-0 bg-light">
            <h5 class="modal-title" id="tripDetailsModalLabel">
              <i class="fas fa-plane-departure me-2"></i>${
                trip.name
              } - Trip Details
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="row">
              <div class="col-12 mb-4">
                <img src="${trip.image}" class="rounded-3 w-100" alt="${
    trip.name
  }" style="max-height: 300px; object-fit: cover;">
              </div>
              <div class="col-12">
                <h4 class="mb-4">${trip.description}</h4>
                <div class="row g-4">
                  <div class="col-md-6">
                    <h5 class="mb-3">Trip Features</h5>
                    <ul class="list-unstyled">
                      <li class="mb-3">
                        <i class="fas fa-clock text-primary me-2"></i>
                        <strong>Duration:</strong> ${trip.features.duration}
                      </li>
                      <li class="mb-3">
                        <i class="fas fa-users text-primary me-2"></i>
                        <strong>Group Size:</strong> ${trip.features.groupSize}
                      </li>
                      <li>
                        <i class="fas fa-ticket-alt text-primary me-2"></i>
                        <strong>Available Spots:</strong> ${trip.features.spots}
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h5 class="mb-3">Trip Highlights</h5>
                    <ul class="list-unstyled">
                      ${trip.highlights
                        .map(
                          (highlight) => `
                        <li class="mb-2">
                          <i class="fas fa-check-circle text-success me-2"></i>${highlight}
                        </li>`
                        )
                        .join('')}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  tripSummaryContainer.innerHTML = html
}

// Update booking summary
function updateBookingSummary() {
  const startDate = document.getElementById('startDate')?.value
  const endDate = document.getElementById('endDate')?.value
  const roomType = document.getElementById('roomType')?.value
  const people = document.getElementById('people')?.value
  const mealPlan = document.getElementById('mealPlan')?.value
  const transportation = document.getElementById('transportation')?.value

  if (
    !startDate ||
    !endDate ||
    !roomType ||
    !people ||
    !mealPlan ||
    !transportation
  )
    return

  const start = new Date(startDate)
  const end = new Date(endDate)
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

  // Get the trip price from the displayed trip summary
  const priceElement = document.querySelector(
    '.card-body .display-6.text-primary'
  )
  const basePrice = priceElement
    ? parseFloat(priceElement.textContent.replace('$', ''))
    : 0

  // Calculate total price
  let totalPrice = basePrice * nights

  // Add room type multiplier
  const roomMultiplier = {
    standard: 1,
    deluxe: 1.3,
    suite: 1.6,
    villa: 2
  }
  totalPrice *= roomMultiplier[roomType] || 1

  // Add meal plan cost
  const mealPlanCost = {
    room_only: 0,
    breakfast: 15,
    half_board: 35,
    full_board: 50,
    all_inclusive: 75
  }
  totalPrice += (mealPlanCost[mealPlan] || 0) * nights * people

  // Add transportation cost
  const transportationCost = {
    none: 0,
    shared: 25,
    private: 60,
    luxury: 120
  }
  totalPrice += transportationCost[transportation] || 0

  const summaryHtml = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h4 class="card-title mb-4">Booking Summary</h4>
        <div class="d-flex justify-content-between mb-2">
          <span>Duration:</span>
          <strong>${nights} nights</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Guests:</span>
          <strong>${people} people</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Room Type:</span>
          <strong>${
            roomType.charAt(0).toUpperCase() + roomType.slice(1)
          }</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Meal Plan:</span>
          <strong>${
            mealPlan.replace('_', ' ').charAt(0).toUpperCase() +
            mealPlan.replace('_', ' ').slice(1)
          }</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Transportation:</span>
          <strong>${
            transportation.charAt(0).toUpperCase() + transportation.slice(1)
          }</strong>
        </div>
        <hr>
        <div class="d-flex justify-content-between mb-2">
          <h5>Total Price:</h5>
          <h5 class="text-primary">$${totalPrice.toFixed(2)}</h5>
        </div>
        <small class="text-muted">Includes all taxes and fees</small>
      </div>
    </div>
  `

  const bookingSummaryContainer = document.getElementById('booking-summary')
  if (bookingSummaryContainer) {
    bookingSummaryContainer.innerHTML = summaryHtml
  }

  return totalPrice
}

// Validate form
function validateForm() {
  const form = document.getElementById('booking-form')
  const formElements = {
    firstName: 'First name is required',
    lastName: 'Last name is required',
    email: 'Email is required',
    phone: 'Phone number is required',
    startDate: 'Check-in date is required',
    endDate: 'Check-out date is required',
    roomType: 'Room type is required',
    people: 'Number of guests is required',
    mealPlan: 'Meal plan is required',
    transportation: 'Transportation option is required'
  }

  let isValid = true

  // Clear all previous errors
  document.querySelectorAll('.invalid-feedback').forEach((el) => {
    el.textContent = ''
  })
  document.querySelectorAll('.is-invalid').forEach((el) => {
    el.classList.remove('is-invalid')
  })

  // Validate each field
  Object.entries(formElements).forEach(([id, errorMessage]) => {
    const element = document.getElementById(id)
    const errorElement =
      document.getElementById(`${id}Error`) ||
      element.insertAdjacentElement(
        'afterend',
        Object.assign(document.createElement('div'), {
          id: `${id}Error`,
          className: 'invalid-feedback'
        })
      )

    if (!element.value) {
      element.classList.add('is-invalid')
      errorElement.textContent = errorMessage
      isValid = false
    }

    // Additional email validation
    if (id === 'email' && element.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(element.value)) {
        element.classList.add('is-invalid')
        errorElement.textContent = 'Please enter a valid email address'
        isValid = false
      }
    }

    // Additional phone validation
    if (id === 'phone' && element.value) {
      const phoneRegex = /^\+?[\d\s-()]{8,}$/
      if (!phoneRegex.test(element.value)) {
        element.classList.add('is-invalid')
        errorElement.textContent = 'Please enter a valid phone number'
        isValid = false
      }
    }
  })

  // Validate dates
  if (!validateDates()) {
    isValid = false
  }

  return isValid
}

// Validate dates and show errors
function validateDates() {
  const startDate = document.getElementById('startDate')
  const endDate = document.getElementById('endDate')
  const startDateError = document.getElementById('startDateError')
  const endDateError = document.getElementById('endDateError')

  if (!startDate || !endDate) return

  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Clear previous errors
  startDateError.textContent = ''
  endDateError.textContent = ''
  startDate.classList.remove('is-invalid')
  endDate.classList.remove('is-invalid')

  let isValid = true

  if (start < today) {
    startDate.classList.add('is-invalid')
    startDateError.textContent = 'Check-in date cannot be in the past'
    isValid = false
  }

  if (end <= start) {
    endDate.classList.add('is-invalid')
    endDateError.textContent = 'Check-out date must be after check-in date'
    isValid = false
  }

  return isValid
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Get trip ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const tripId = urlParams.get('id')

    if (!tripId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No trip ID provided in the URL',
        confirmButtonText: 'Go to Destinations',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'destinations.html'
        }
      })
      return
    }

    // Fetch trip details
    const trip = await fetchTrip(tripId)
    if (!trip) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load trip details',
        confirmButtonText: 'Go to Destinations',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'destinations.html'
        }
      })
      return
    }

    // Display trip summary
    displayTripSummary(trip)

    // Add error message elements after date inputs
    if (startDateInput) {
      startDateInput.insertAdjacentHTML(
        'afterend',
        '<div id="startDateError" class="invalid-feedback"></div>'
      )
    }
    if (endDateInput) {
      endDateInput.insertAdjacentHTML(
        'afterend',
        '<div id="endDateError" class="invalid-feedback"></div>'
      )
    }

    // Initialize form inputs
    const form = document.getElementById('booking-form')
    if (form) {
      // Add event listeners for form inputs
      const formElements = [
        'startDate',
        'endDate',
        'roomType',
        'people',
        'mealPlan',
        'transportation'
      ]
      formElements.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          element.addEventListener('change', () => {
            validateForm()
            updateBookingSummary()
          })

          // Add error div after each input
          if (!document.getElementById(`${id}Error`)) {
            element.insertAdjacentHTML(
              'afterend',
              `<div id="${id}Error" class="invalid-feedback"></div>`
            )
          }
        }
      })

      // Initialize booking summary
      updateBookingSummary()

      // Handle form submission
      form.addEventListener('submit', async (e) => {
        e.preventDefault()

        // Validate form before submission
        if (!validateForm()) {
          return
        }

        const calculatedTotalPrice = updateBookingSummary()

        const formData = {
          tripId,
          trip: {
            name: trip.name,
            image: trip.image,
            country: trip.country,
            pricePerNight: trip.pricePerNight
          },
          customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            specialRequests:
              document.getElementById('specialRequests')?.value || ''
          },
          startDate: startDateInput.value,
          endDate: endDateInput.value,
          roomType: document.getElementById('roomType').value,
          numberOfPeople: parseInt(document.getElementById('people').value),
          mealPlan: document.getElementById('mealPlan').value,
          transportation: document.getElementById('transportation').value,
          totalPrice: calculatedTotalPrice,
          status: 'pending',
          createdAt: new Date().toISOString()
        }

        try {
          const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || 'Failed to create booking')
          }

          Swal.fire({
            icon: 'success',
            title: 'Booking Successful!',
            html: `
              <div class="text-start">
                <p><strong>Booking Reference:</strong> ${data._id}</p>
                <p><strong>Guest:</strong> ${formData.customer.firstName} ${
              formData.customer.lastName
            }</p>
                <p><strong>Email:</strong> ${formData.customer.email}</p>
                <p><strong>Phone:</strong> ${formData.customer.phone}</p>
                <p><strong>Trip:</strong> ${trip.name}</p>
                <p><strong>Dates:</strong> ${formData.startDate} to ${
              formData.endDate
            }</p>
                <p><strong>Room Type:</strong> ${
                  formData.roomType.charAt(0).toUpperCase() +
                  formData.roomType.slice(1)
                }</p>
                <p><strong>Guests:</strong> ${formData.numberOfPeople}</p>
                <p><strong>Total Price:</strong> $${formData.totalPrice.toFixed(
                  2
                )}</p>
                ${
                  formData.customer.specialRequests
                    ? `<p><strong>Special Requests:</strong> ${formData.customer.specialRequests}</p>`
                    : ''
                }
                <p class="mt-3 text-muted">A confirmation email with further details will be sent to you shortly.</p>
              </div>
            `,
            confirmButtonText: 'Done'
          }).then((result) => {
            if (result.isConfirmed) {
              // Reset form fields
              form.reset()

              // Reset select elements to their first option
              document.getElementById('roomType').selectedIndex = 0
              document.getElementById('mealPlan').selectedIndex = 0
              document.getElementById('transportation').selectedIndex = 0

              // Clear any validation states
              document.querySelectorAll('.is-invalid').forEach((el) => {
                el.classList.remove('is-invalid')
              })
              document.querySelectorAll('.invalid-feedback').forEach((el) => {
                el.textContent = ''
              })

              // Reset booking summary
              const bookingSummaryContainer =
                document.getElementById('booking-summary')
              if (bookingSummaryContainer) {
                bookingSummaryContainer.innerHTML = ''
              }

              // Scroll to top of the page
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Booking Failed',
            text: error.message
          })
        }
      })
    }
  } catch (error) {
    console.error('Error initializing page:', error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Please try again later.'
    })
  }
})
