# EasyTrip: Travel and Tourism Management System

A modern web application for managing travel bookings and tourism activities. Built with Express.js, MongoDB, and vanilla JavaScript.

## Features

- User Authentication (Login/Register)
- JWT-based Authorization
- Responsive Design
- Booking Management
- User Dashboard
- Admin Dashboard
- Modern UI with Bootstrap 5

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd easytrip
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/easytrip
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

## Running the Application

1. Start MongoDB service on your machine

2. Start the backend server:
```bash
cd backend
npm start
```

3. Open the frontend:
- Navigate to the `frontend` directory
- Open `index.html` in your browser
- Or use a local server like Live Server in VS Code

## Usage

1. Register a new account or login with existing credentials
2. Browse available destinations
3. Make bookings for your preferred destinations
4. View your bookings in the dashboard
5. Admins can manage all bookings through the admin dashboard

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Bookings
- GET `/api/bookings` - Get all bookings (admin only)
- GET `/api/bookings/my-bookings` - Get user's bookings
- POST `/api/bookings` - Create new booking
- PUT `/api/bookings/:id` - Update booking status (admin only)
- DELETE `/api/bookings/:id` - Cancel booking

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Bootstrap 5
  - Font Awesome
  - SweetAlert2

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT)
  - bcryptjs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 