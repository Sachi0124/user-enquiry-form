// Import the Enquiry model
let Enquiry = require('../../model/enquiry.model'); 

// Controller function to handle enquiry insertion
const enquiryInsert = async (req, res) => {
    let { name, email, phone, message } = req.body;

    try {
        const newEnquiry = new Enquiry({ name, email, phone, message });
        const savedEnquiry = await newEnquiry.save();

        return res.status(201).json({
            status: 1, 
            message: "Enquiry saved successfully",
            enquiry: savedEnquiry
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            return res.status(400).json({ 
                status: 0, 
                message: "Validation failed",
                errors: errors
            });
        }
        if (error.code === 11000) { 
            return res.status(409).json({ 
                status: 0,
                message: "Email already exists. Please use a different email.",
                error: error.message
            });
        }
        console.error("Error saving enquiry:", error); 
        return res.status(500).json({ 
            status: 0,
            message: "Error while saving enquiry",
            error: error.message
        });
    }
}; 

// Controller function to get all enquiries
const enquiryList = async (req, res) => {
    try {
        let enquiries = await Enquiry.find(); 
        return res.status(200).json({ 
            status: 1,
            enquiryList: enquiries 
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        return res.status(500).json({
            status: 0,
            message: "Error while fetching enquiries",
            error: error.message
        });
    }
};

// Controller function to delete an enquiry by ID
const enquiryDelete = async (req, res) => { 
    try {
        let enId = req.params.id; 
        let result = await Enquiry.deleteOne({ _id: enId }); 

        if (result.deletedCount === 1) {
            return res.status(200).json({ 
                status: 1,
                message: "Enquiry deleted successfully",
            });
        } else {
            return res.status(404).json({ 
                status: 0,
                message: "Enquiry not found",
            });
        }
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        return res.status(500).json({
            status: 0,
            message: "Error while deleting enquiry",
            error: error.message
        });
    }
};

// --- NEW: Controller function to get a single enquiry by ID (for edit) ---
const enquirysingleRow = async (req, res) => { // Corrected syntax 'async'
    try {
        let enId = req.params.id;
        let enquiry = await Enquiry.findOne({ _id: enId }); // Use Enquiry model

        if (!enquiry) {
            return res.status(404).json({
                status: 0,
                message: "Enquiry not found"
            });
        }

        return res.status(200).json({ // Use res.json for API response
            status: 1,
            enquiry: enquiry
        });
    } catch (error) {
        console.error("Error fetching single enquiry:", error);
        return res.status(500).json({
            status: 0,
            message: "Error fetching single enquiry",
            error: error.message
        });
    }
};

// --- NEW: Controller function to update an enquiry by ID ---
const enquiryUpdate = async (req, res) => { // Corrected syntax 'async' and function body
    try {
        let enquiryId = req.params.id;
        let { name, email, phone, message } = req.body;
        
        let updateObj = { name, email, phone, message };

        // Find the enquiry by ID and update it. { new: true } returns the updated document.
        let updatedEnquiry = await Enquiry.findByIdAndUpdate(enquiryId, updateObj, { new: true, runValidators: true });

        if (!updatedEnquiry) {
            return res.status(404).json({
                status: 0,
                message: "Enquiry not found for update"
            });
        }

        return res.status(200).json({ 
            status: 1, 
            message: "Enquiry updated successfully", 
            enquiry: updatedEnquiry 
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            return res.status(400).json({ 
                status: 0, 
                message: "Validation failed during update",
                errors: errors
            });
        }
        console.error("Error updating enquiry:", error);
        return res.status(500).json({
            status: 0,
            message: "Error while updating enquiry",
            error: error.message
        });
    }
};

// Export all functions, including the new ones
module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquirysingleRow, enquiryUpdate };