// core-backend/server.js
require('dotenv').config(); // Load environment variables from .env file at the very top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware

// Import authentication routes
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000, or a port specified in .env

// --- Middleware ---
// Body parser for JSON requests (to read data sent in POST/PUT requests)
app.use(express.json());

// CORS configuration: Allows your frontend (on localhost:3000) to make requests to this backend
app.use(cors({
    origin: 'http://localhost:3000', // Only allow requests from your Next.js frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers in requests
}));

// --- Basic Route (for testing if server is alive) ---
app.get('/', (req, res) => {
    res.send('Core Backend Service is running!');
});

// --- Route Middlewares ---
// Use the authentication routes under the /api/auth path
app.use('/api/auth', authRoutes);

// --- Database Connection (MongoDB) ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,      // Recommended for compatibility (can be removed in Mongoose 4.0+)
    useUnifiedTopology: true,   // Recommended for compatibility (can be removed in Mongoose 4.0+)
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Core Backend Service listening on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});