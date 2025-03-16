require('dotenv').config()
const mongoose = require('mongoose')
const Trip = require('../models/Trip')

const sampleTrips = [
  {
    name: 'Paris',
    country: 'France',
    region: 'europe',
    description: 'Experience the city of love and its iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    pricePerNight: 200,
    rating: 4.5,
    ratingCount: 1250,
    features: {
      duration: '3-7 Days',
      groupSize: '2-8 People',
      spots: '4 Spots'
    },
    highlights: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame',
      'Seine River Cruise'
    ]
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia',
    description: 'Discover tropical paradise and rich culture.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    pricePerNight: 150,
    rating: 4.9,
    ratingCount: 980,
    features: {
      duration: '5-10 Days',
      groupSize: '2-6 People',
      spots: '6 Spots'
    },
    highlights: [
      'Ubud Rice Terraces',
      'Uluwatu Temple',
      'Nusa Penida',
      'Mount Batur'
    ]
  },
  {
    name: 'Santorini',
    country: 'Greece',
    region: 'europe',
    description: 'Enjoy breathtaking views and Mediterranean charm.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    pricePerNight: 280,
    rating: 4.8,
    ratingCount: 850,
    features: {
      duration: '4-8 Days',
      groupSize: '2-4 People',
      spots: '5 Spots'
    },
    highlights: [
      'Oia Sunset',
      'Caldera Views',
      'Wine Tasting',
      'Black Sand Beaches'
    ]
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    region: 'asia',
    description: 'Immerse yourself in Japanese culture and modernity.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    pricePerNight: 250,
    rating: 4.6,
    ratingCount: 1100,
    features: {
      duration: '5-12 Days',
      groupSize: '1-6 People',
      spots: '8 Spots'
    },
    highlights: [
      'Shibuya Crossing',
      'Mount Fuji',
      'Senso-ji Temple',
      'Robot Restaurant'
    ]
  },
  {
    name: 'Dubai',
    country: 'UAE',
    region: 'middleeast',
    description: 'Experience luxury and modern architectural marvels.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    pricePerNight: 400,
    rating: 4.9,
    ratingCount: 750,
    features: {
      duration: '4-10 Days',
      groupSize: '2-8 People',
      spots: '7 Spots'
    },
    highlights: ['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah', 'Dubai Mall']
  },
  {
    name: 'New York',
    country: 'USA',
    region: 'americas',
    description: 'Explore the city that never sleeps.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    pricePerNight: 350,
    rating: 4.7,
    ratingCount: 1500,
    features: {
      duration: '3-14 Days',
      groupSize: '1-6 People',
      spots: '10 Spots'
    },
    highlights: [
      'Times Square',
      'Central Park',
      'Statue of Liberty',
      'Broadway Shows'
    ]
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    region: 'asia',
    description: 'Vibrant street life and ancient temples.',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365',
    pricePerNight: 120,
    rating: 4.5,
    ratingCount: 920,
    features: {
      duration: '4-9 Days',
      groupSize: '2-10 People',
      spots: '6 Spots'
    },
    highlights: [
      'Grand Palace',
      'Wat Arun',
      'Floating Markets',
      'Street Food Tours'
    ]
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    region: 'europe',
    description: 'Art, architecture, and Mediterranean lifestyle.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    pricePerNight: 180,
    rating: 4.8,
    ratingCount: 1050,
    features: {
      duration: '3-8 Days',
      groupSize: '2-8 People',
      spots: '7 Spots'
    },
    highlights: [
      'Sagrada Familia',
      'Park Güell',
      'Las Ramblas',
      'Gothic Quarter'
    ]
  },
  {
    name: 'Cairo',
    country: 'Egypt',
    region: 'africa',
    description: 'Ancient wonders and rich history.',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
    pricePerNight: 160,
    rating: 4.6,
    ratingCount: 850,
    features: {
      duration: '5-10 Days',
      groupSize: '2-12 People',
      spots: '8 Spots'
    },
    highlights: [
      'Pyramids of Giza',
      'Egyptian Museum',
      'Nile River Cruise',
      'Khan el-Khalili'
    ]
  }
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Delete existing trips
    await Trip.deleteMany({})
    console.log('Cleared existing trips')

    // Insert new trips
    await Trip.insertMany(sampleTrips)
    console.log('Sample trips inserted successfully')

    // Disconnect from MongoDB
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
