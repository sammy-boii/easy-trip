class App {
  constructor() {
    this.pages = {
      home: this.renderHome,
      login: this.renderLogin,
      register: this.renderRegister,
      booking: this.renderBooking,
      dashboard: this.renderDashboard
    }

    this.baseURL = 'http://localhost:5000/api'
    this.mainContent = document.getElementById('main-content')
    this.setupEventListeners()
    this.navigateToPage('home')
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-page]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const page = e.currentTarget.dataset.page
        this.navigateToPage(page)
      })
    })

    // Logout
    const logoutButton = document.getElementById('logout')
    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault()
        auth.logout()
        this.navigateToPage('home')
      })
    }
  }

  navigateToPage(page) {
    if (this.pages[page]) {
      this.pages[page].call(this)
    }
  }

  renderHome() {
    this.mainContent.innerHTML = `
            <div class="hero">
                <div class="container">
                    <h1 class="fade-in">Discover Your Next Adventure</h1>
                    <p class="lead fade-in">Experience the world's most beautiful destinations with EasyTrip</p>
                    <a href="#" class="btn btn-light btn-lg fade-in mt-4" onclick="app.navigateToPage('booking')">Book Now</a>
                </div>
            </div>
            
            <div class="container my-5">
                <h2 class="text-center mb-4">Popular Destinations</h2>
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" class="card-img-top" alt="Paris" style="height: 250px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">Paris, France</h5>
                                <p class="card-text">Experience the city of love and its iconic landmarks.</p>
                                <button onclick="app.bookDestination('Paris')" class="btn btn-primary w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4" class="card-img-top" alt="Bali" style="height: 250px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">Bali, Indonesia</h5>
                                <p class="card-text">Discover tropical paradise and rich culture.</p>
                                <button onclick="app.bookDestination('Bali')" class="btn btn-primary w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e" class="card-img-top" alt="Santorini" style="height: 250px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">Santorini, Greece</h5>
                                <p class="card-text">Enjoy breathtaking views and Mediterranean charm.</p>
                                <button onclick="app.bookDestination('Santorini')" class="btn btn-primary w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26" class="card-img-top" alt="Tokyo" style="height: 250px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">Tokyo, Japan</h5>
                                <p class="card-text">Immerse yourself in Japanese culture and modernity.</p>
                                <button onclick="app.bookDestination('Tokyo')" class="btn btn-primary w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2" class="card-img-top" alt="Dubai" style="height: 250px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">Dubai, UAE</h5>
                                <p class="card-text">Experience luxury and modern architectural marvels.</p>
                                <button onclick="app.bookDestination('Dubai')" class="btn btn-primary w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25" class="card-img-top" alt="New York" style="height: 250px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">New York, USA</h5>
                                <p class="card-text">Explore the city that never sleeps.</p>
                                <button onclick="app.bookDestination('New York')" class="btn btn-primary w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    this.setupEventListeners()
  }

  renderLogin() {
    if (auth.isAuthenticated()) {
      this.navigateToPage('dashboard')
      return
    }

    this.mainContent.innerHTML = `
            <div class="auth-page">
                <div class="form-container">
                    <h2 class="text-center mb-4">Login</h2>
                    <form id="login-form">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        `

    document
      .getElementById('login-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
          await auth.login(email, password)
          auth.updateUIState()
          this.navigateToPage('dashboard')
          Swal.fire('Success', 'Logged in successfully!', 'success')
        } catch (error) {
          Swal.fire('Error', error.message, 'error')
        }
      })
  }

  renderRegister() {
    if (auth.isAuthenticated()) {
      this.navigateToPage('dashboard')
      return
    }

    this.mainContent.innerHTML = `
            <div class="auth-page">
                <div class="form-container">
                    <h2 class="text-center mb-4">Register</h2>
                    <form id="register-form">
                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        `

    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
          await auth.register(name, email, password)
          auth.updateUIState()
          this.navigateToPage('dashboard')
          Swal.fire('Success', 'Registered successfully!', 'success')
        } catch (error) {
          Swal.fire('Error', error.message, 'error')
        }
      })
  }

  renderBooking() {
    if (!auth.isAuthenticated()) {
      Swal.fire('Error', 'Please login to book a trip', 'error')
      this.navigateToPage('login')
      return
    }

    const today = new Date().toISOString().split('T')[0]
    const destinations = {
      Paris: {
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        description:
          'Experience the magic of Paris with its iconic Eiffel Tower, world-class museums, charming cafes, and romantic atmosphere. Explore the Louvre, stroll through Montmartre, and indulge in exquisite French cuisine.',
        highlights: [
          'Eiffel Tower',
          'Louvre Museum',
          'Notre-Dame Cathedral',
          'Champs-Élysées',
          'Seine River Cruises'
        ],
        basePrice: 200
      },
      Bali: {
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        description:
          'Discover the paradise island of Bali with its pristine beaches, lush rice terraces, ancient temples, and vibrant culture. Experience traditional ceremonies, wellness retreats, and world-class surfing.',
        highlights: [
          'Ubud Sacred Monkey Forest',
          'Tanah Lot Temple',
          'Rice Terraces',
          'Nusa Dua Beach',
          'Mount Batur'
        ],
        basePrice: 150
      },
      Santorini: {
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
        description:
          "Fall in love with Santorini's stunning white-washed buildings, blue-domed churches, and breathtaking sunsets. Enjoy Mediterranean cuisine, wine tasting, and spectacular views of the Aegean Sea.",
        highlights: [
          'Oia Sunset',
          'Fira Town',
          'Black Sand Beaches',
          'Volcanic Islands',
          'Wine Tasting'
        ],
        basePrice: 180
      },
      Tokyo: {
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        description:
          'Immerse yourself in the fascinating blend of ultra-modern technology and traditional culture in Tokyo. Experience amazing food, efficient transportation, and unique Japanese hospitality.',
        highlights: [
          'Shibuya Crossing',
          'Senso-ji Temple',
          'Tokyo Skytree',
          'Tsukiji Fish Market',
          'Akihabara'
        ],
        basePrice: 250
      },
      Dubai: {
        image: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2',
        description:
          "Experience luxury and innovation in Dubai with its stunning architecture, shopping festivals, desert adventures, and world-class entertainment. Visit the world's tallest building and artificial islands.",
        highlights: [
          'Burj Khalifa',
          'Dubai Mall',
          'Palm Jumeirah',
          'Desert Safari',
          'Gold Souk'
        ],
        basePrice: 300
      },
      'New York': {
        image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25',
        description:
          'Explore the city that never sleeps with its iconic skyline, diverse neighborhoods, world-class museums, and endless entertainment options. Experience the energy of Times Square and the serenity of Central Park.',
        highlights: [
          'Times Square',
          'Central Park',
          'Statue of Liberty',
          'Broadway Shows',
          'Empire State Building'
        ],
        basePrice: 280
      }
    }

    this.mainContent.innerHTML = `
      <div class="booking-page">
        <!-- Destination Showcase -->
        <div class="container-fluid p-0">
          <div class="hero" style="height: 50vh; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800') center/cover;">
            <div class="container text-center">
              <h1 class="fade-in">Book Your Perfect Getaway</h1>
              <p class="lead fade-in">Choose from our handpicked destinations and create memories that last forever</p>
            </div>
          </div>
        </div>

        <div class="container my-5">
          <!-- Destination Cards -->
          <div class="row mb-5">
            ${Object.entries(destinations)
              .map(
                ([name, info]) => `
              <div class="col-md-4 mb-4">
                <div class="card h-100">
                  <img src="${
                    info.image
                  }" class="card-img-top" alt="${name}" style="height: 200px; object-fit: cover;">
                  <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${info.description}</p>
                    <h6 class="mb-3">Highlights:</h6>
                    <ul class="list-unstyled">
                      ${info.highlights
                        .map(
                          (highlight) => `
                        <li><i class="fas fa-check-circle text-success me-2"></i>${highlight}</li>
                      `
                        )
                        .join('')}
                    </ul>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                      <div class="text-muted">Starting from</div>
                      <div class="h5 mb-0">$${info.basePrice}/night</div>
                    </div>
                  </div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>

          <!-- Booking Form -->
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="booking-form">
                <h2 class="text-center mb-4">Make Your Reservation</h2>
                <form id="booking-form">
                  <div class="mb-4">
                    <label for="destination" class="form-label">Choose Your Destination</label>
                    <select class="form-select form-select-lg" id="destination" required>
                      <option value="">Select destination</option>
                      ${Object.keys(destinations)
                        .map(
                          (dest) => `
                        <option value="${dest}">${dest}</option>
                      `
                        )
                        .join('')}
                    </select>
                  </div>
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <label for="startDate" class="form-label">Check-in Date</label>
                      <input type="date" class="form-control form-control-lg" id="startDate" min="${today}" required>
                    </div>
                    <div class="col-md-6">
                      <label for="endDate" class="form-label">Check-out Date</label>
                      <input type="date" class="form-control form-control-lg" id="endDate" min="${today}" required>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <label for="people" class="form-label">Number of Guests</label>
                      <input type="number" class="form-control form-control-lg" id="people" min="1" max="10" required>
                    </div>
                    <div class="col-md-6">
                      <label for="roomType" class="form-label">Room Type</label>
                      <select class="form-select form-select-lg" id="roomType" required>
                        <option value="standard">Standard Room</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="suite">Suite</option>
                        <option value="villa">Villa</option>
                      </select>
                    </div>
                  </div>
                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg">
                      <i class="fas fa-paper-plane me-2"></i>Book Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    // Add event listeners for date validation
    const startDateInput = document.getElementById('startDate')
    const endDateInput = document.getElementById('endDate')
    const peopleInput = document.getElementById('people')
    const destinationSelect = document.getElementById('destination')
    const roomTypeSelect = document.getElementById('roomType')

    startDateInput.addEventListener('change', () => {
      endDateInput.min = startDateInput.value
      if (endDateInput.value && endDateInput.value < startDateInput.value) {
        endDateInput.value = startDateInput.value
      }
    })

    document
      .getElementById('booking-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault()

        // Calculate price based on destination, room type, and number of people
        const basePrice = {
          Paris: 200,
          Bali: 150,
          Santorini: 180,
          Tokyo: 250,
          Dubai: 300,
          'New York': 280,
          Maldives: 400,
          London: 220,
          Rome: 190,
          Barcelona: 170
        }

        const roomMultiplier = {
          standard: 1,
          deluxe: 1.5,
          suite: 2,
          villa: 3
        }

        const destination = destinationSelect.value
        const roomType = roomTypeSelect.value
        const numberOfPeople = parseInt(peopleInput.value)
        const startDate = new Date(startDateInput.value)
        const endDate = new Date(endDateInput.value)
        const numberOfDays = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        )

        const totalPrice = Math.round(
          basePrice[destination] *
            roomMultiplier[roomType] *
            numberOfDays *
            Math.ceil(numberOfPeople / 2)
        )

        const formData = {
          destination,
          startDate: startDateInput.value,
          endDate: endDateInput.value,
          numberOfPeople,
          roomType,
          totalPrice
        }

        try {
          const response = await fetch(`${this.baseURL}/bookings`, {
            method: 'POST',
            headers: auth.getAuthHeaders(),
            body: JSON.stringify(formData)
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message)
          }

          Swal.fire({
            title: 'Booking Successful!',
            html: `
            <div class="text-start">
              <p><strong>Destination:</strong> ${destination}</p>
              <p><strong>Dates:</strong> ${startDateInput.value} to ${
              endDateInput.value
            }</p>
              <p><strong>Room Type:</strong> ${
                roomType.charAt(0).toUpperCase() + roomType.slice(1)
              }</p>
              <p><strong>Total Price:</strong> $${totalPrice}</p>
            </div>
          `,
            icon: 'success'
          }).then(() => {
            this.navigateToPage('dashboard')
          })
        } catch (error) {
          Swal.fire('Error', error.message, 'error')
        }
      })
  }

  async renderDashboard() {
    if (!auth.isAuthenticated()) {
      this.navigateToPage('login')
      return
    }

    try {
      const response = await fetch(`${this.baseURL}/bookings/my-bookings`, {
        headers: auth.getAuthHeaders()
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      const bookings = data.data

      this.mainContent.innerHTML = `
                <div class="container my-5">
                    <h2 class="mb-4">Welcome, ${auth.user.name}!</h2>
                    <div class="dashboard-stats mb-5">
                        <div class="row">
                            <div class="col-md-4 mb-4">
                                <div class="stat-card">
                                    <i class="fas fa-plane"></i>
                                    <h3>Total Bookings</h3>
                                    <p class="h2">${bookings.length}</p>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="stat-card">
                                    <i class="fas fa-calendar-check"></i>
                                    <h3>Active Bookings</h3>
                                    <p class="h2">${
                                      bookings.filter(
                                        (b) => b.status === 'confirmed'
                                      ).length
                                    }</p>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="stat-card">
                                    <i class="fas fa-clock"></i>
                                    <h3>Pending Bookings</h3>
                                    <p class="h2">${
                                      bookings.filter(
                                        (b) => b.status === 'pending'
                                      ).length
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 class="mb-4">Your Bookings</h3>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Destination</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>People</th>
                                    <th>Status</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bookings
                                  .map(
                                    (booking) => `
                                    <tr>
                                        <td>${booking.destination}</td>
                                        <td>${new Date(
                                          booking.startDate
                                        ).toLocaleDateString()}</td>
                                        <td>${new Date(
                                          booking.endDate
                                        ).toLocaleDateString()}</td>
                                        <td>${booking.numberOfPeople}</td>
                                        <td><span class="badge bg-${
                                          booking.status === 'confirmed'
                                            ? 'success'
                                            : 'warning'
                                        }">${booking.status}</span></td>
                                        <td>$${booking.totalPrice}</td>
                                    </tr>
                                `
                                  )
                                  .join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `
    } catch (error) {
      Swal.fire('Error', error.message, 'error')
    }
  }

  // Add this new method to handle booking from destination cards
  bookDestination(destination) {
    if (!auth.isAuthenticated()) {
      Swal.fire('Error', 'Please login to book a trip', 'error')
      this.navigateToPage('login')
      return
    }
    this.navigateToPage('booking')
    // Set timeout to ensure the booking form is rendered
    setTimeout(() => {
      const destinationSelect = document.getElementById('destination')
      if (destinationSelect) {
        destinationSelect.value = destination
      }
    }, 100)
  }
}

// Initialize the app
const app = new App()
