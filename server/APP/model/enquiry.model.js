let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let enquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure emails are unique
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// Create the Mongoose model
const Enquiry = mongoose.model('Enquiry', enquirySchema);

// Export the model for use in other files
module.exports = Enquiry;