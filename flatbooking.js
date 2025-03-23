const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: Date
});

const Booking = mongoose.model('Booking', bookingSchema);

// API endpoint to handle booking requests
app.post('/api/book', (req, res) => {
    const bookingData = new Booking(req.body);
    bookingData.save()
        .then(() => res.json({ message: 'Flat Booked!', data: bookingData }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});