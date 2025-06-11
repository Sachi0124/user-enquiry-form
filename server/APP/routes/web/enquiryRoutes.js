let express = require('express');
let enquiryRouter = express.Router();

// Import all controller functions, including the new 'enquirysingleRow' and 'enquiryUpdate'
const { enquiryInsert, enquiryList, enquiryDelete, enquirysingleRow, enquiryUpdate } = require('../../controller/web/enquiryController'); 

// POST route to insert a new enquiry
enquiryRouter.post("/insert", enquiryInsert);

// GET route to view all enquiries
enquiryRouter.get("/view", enquiryList); 

// DELETE route to delete an enquiry by ID
enquiryRouter.delete("/delete/:id", enquiryDelete);

// NEW: GET route to fetch a single enquiry by ID (for editing)
enquiryRouter.get("/single/:id", enquirysingleRow);

// NEW: PUT route to update an enquiry by ID
enquiryRouter.put("/update/:id", enquiryUpdate);

module.exports = enquiryRouter;