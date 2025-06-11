let express = require('express');
let mongoose = require('mongoose');
let app = express();
require('dotenv').config(); // Load environment variables from .env file
let cors = require('cors'); // Import the cors package

// --- BEST PRACTICE ADJUSTMENT: Apply CORS middleware early ---
app.use(cors()); 

// Import the enquiry router from its correct, nested path
// This should be done AFTER middleware that affects all routes like cors
let enquiryRouter = require('./APP/routes/web/enquiryRoutes');


// Connect to MongoDB
mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err); // Use console.error for errors
    });

// Middleware to parse JSON body from incoming requests
app.use(express.json());

// Use the enquiry router for requests starting with /api/enquiries
// For example, a POST request to /api/enquiries/insert will hit your route
app.use('/api/enquiries', enquiryRouter);

// Start the Express server
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});