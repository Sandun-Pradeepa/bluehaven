import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { DESTINATIONS, HOTELS } from '../src/data/destinationsData';
import { Destination, Hotel, Booking } from '../src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const DESTINATIONS_FILE = path.join(DATA_DIR, 'destinations.json');
const HOTELS_FILE = path.join(DATA_DIR, 'hotels.json');

// Mongoose Models definitions
const DestinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  thumbnail: { type: String, required: true },
  highlights: [{ type: String }],
  travelInfo: {
    distance: { type: String, required: true },
    bestTime: { type: String, required: true },
    idealFor: { type: String, required: true }
  }
});

const HotelSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  destinationId: { type: String, required: true }
});

const BookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  tourDate: { type: String, required: true },
  tourType: { type: String, required: true },
  hotelOption: { type: String, required: true },
  specialRequests: { type: String },
  destinationId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

let DestinationModel: mongoose.Model<any>;
let HotelModel: mongoose.Model<any>;
let BookingModel: mongoose.Model<any>;

let isMongoConnected = false;

// Initialize Mongoose Models safely
try {
  DestinationModel = mongoose.model('Destination', DestinationSchema);
  HotelModel = mongoose.model('Hotel', HotelSchema);
  BookingModel = mongoose.model('Booking', BookingSchema);
} catch (e) {
  DestinationModel = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
  HotelModel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);
  BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
}

export async function initDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    console.log('Attempting to connect to MongoDB...');
    try {
      await mongoose.connect(mongoUri);
      isMongoConnected = true;
      console.log('Successfully connected to MongoDB!');

      // Seed if empty
      const destCount = await DestinationModel.countDocuments();
      if (destCount === 0) {
        console.log('Seeding MongoDB destinations and hotels...');
        await DestinationModel.insertMany(DESTINATIONS);
        await HotelModel.insertMany(HOTELS);
        console.log('MongoDB seeding completed successfully.');
      }
      return;
    } catch (err) {
      console.error('Failed to connect to MongoDB, falling back to JSON storage.', err);
    }
  }

  // Fallback / Local Storage Initialization
  console.log('Using local JSON file-based storage.');
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DESTINATIONS_FILE)) {
    fs.writeFileSync(DESTINATIONS_FILE, JSON.stringify(DESTINATIONS, null, 2), 'utf-8');
  }

  if (!fs.existsSync(HOTELS_FILE)) {
    fs.writeFileSync(HOTELS_FILE, JSON.stringify(HOTELS, null, 2), 'utf-8');
  }

  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Get all destinations
export async function getAllDestinations(): Promise<Destination[]> {
  if (isMongoConnected) {
    const docs = await DestinationModel.find({});
    return docs.map(d => ({
      id: d.id,
      title: d.title,
      tagline: d.tagline,
      description: d.description,
      coverImage: d.coverImage,
      thumbnail: d.thumbnail,
      highlights: d.highlights,
      travelInfo: {
        distance: d.travelInfo.distance,
        bestTime: d.travelInfo.bestTime,
        idealFor: d.travelInfo.idealFor
      }
    }));
  } else {
    const raw = fs.readFileSync(DESTINATIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  }
}

// Get single destination by ID
export async function getDestinationById(id: string): Promise<Destination | null> {
  if (isMongoConnected) {
    const d = await DestinationModel.findOne({ id });
    if (!d) return null;
    return {
      id: d.id,
      title: d.title,
      tagline: d.tagline,
      description: d.description,
      coverImage: d.coverImage,
      thumbnail: d.thumbnail,
      highlights: d.highlights,
      travelInfo: {
        distance: d.travelInfo.distance,
        bestTime: d.travelInfo.bestTime,
        idealFor: d.travelInfo.idealFor
      }
    };
  } else {
    const dests = await getAllDestinations();
    return dests.find(d => d.id === id) || null;
  }
}

// Get hotels for a destination
export async function getHotelsByDestination(destinationId: string): Promise<Hotel[]> {
  if (isMongoConnected) {
    const docs = await HotelModel.find({ destinationId });
    return docs.map(h => ({
      id: h.id,
      name: h.name,
      image: h.image,
      destinationId: h.destinationId
    }));
  } else {
    const raw = fs.readFileSync(HOTELS_FILE, 'utf-8');
    const allHotels: Hotel[] = JSON.parse(raw);
    return allHotels.filter(h => h.destinationId === destinationId);
  }
}

// Add a booking
export async function saveBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
  if (isMongoConnected) {
    const b = new BookingModel(bookingData);
    const saved = await b.save();
    return {
      id: saved._id.toString(),
      fullName: saved.fullName,
      email: saved.email,
      phoneNumber: saved.phoneNumber,
      tourDate: saved.tourDate,
      tourType: saved.tourType,
      hotelOption: saved.hotelOption,
      specialRequests: saved.specialRequests,
      destinationId: saved.destinationId,
      createdAt: saved.createdAt.toISOString()
    };
  } else {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    const bookings: Booking[] = JSON.parse(raw);
    const newBooking: Booking = {
      ...bookingData,
      id: `b-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
    return newBooking;
  }
}

// Helper to get bookings (useful for debug or tracking)
export async function getAllBookings(): Promise<Booking[]> {
  if (isMongoConnected) {
    const docs = await BookingModel.find({}).sort({ createdAt: -1 });
    return docs.map(b => ({
      id: b._id.toString(),
      fullName: b.fullName,
      email: b.email,
      phoneNumber: b.phoneNumber,
      tourDate: b.tourDate,
      tourType: b.tourType,
      hotelOption: b.hotelOption,
      specialRequests: b.specialRequests,
      destinationId: b.destinationId,
      createdAt: b.createdAt.toISOString()
    }));
  } else {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  }
}
