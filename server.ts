import cors from 'cors';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import {
  initDatabase,
  getAllDestinations,
  getDestinationById,
  getHotelsByDestination,
  saveBooking,
  getAllBookings
} from './server/dbService';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  app.use(cors());

  // Initialize the database (MongoDB or file fallback)
  await initDatabase();

  // API Endpoints
  // GET all destinations
  app.get('/api/destinations', async (req, res) => {
    try {
      const destinations = await getAllDestinations();
      res.json(destinations);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve destinations', details: err.message });
    }
  });

  // GET single destination by ID with its hotels
  app.get('/api/destinations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const destination = await getDestinationById(id);
      if (!destination) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      const hotels = await getHotelsByDestination(id);
      res.json({ destination, hotels });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve destination', details: err.message });
    }
  });

  // POST create booking
  app.post('/api/bookings', async (req, res) => {
    try {
      const { fullName, email, phoneNumber, tourDate, tourType, hotelOption, specialRequests, destinationId } = req.body;

      if (!fullName || !email || !phoneNumber || !tourDate || !tourType || !hotelOption || !destinationId) {
        return res.status(400).json({ error: 'Missing required booking fields' });
      }

      const booking = await saveBooking({
        fullName,
        email,
        phoneNumber,
        tourDate,
        tourType,
        hotelOption,
        specialRequests: specialRequests || '',
        destinationId
      });

      res.status(201).json({ success: true, booking });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save booking', details: err.message });
    }
  });

  // GET all bookings (useful for listing on some developer dashboard or confirmation check)
  app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await getAllBookings();
      res.json(bookings);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve bookings', details: err.message });
    }
  });

  // Vite Middleware integration for development vs production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Click preview or visit: http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
