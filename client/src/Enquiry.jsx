import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { EnquiryList } from './enquiry/EnquiryList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Enquiry() {
    const [enquiries, setEnquiries] = useState([]); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        _id: '' // Crucial for identifying if we are editing an existing enquiry
    });

    /**
     * Fetches all enquiries from the backend API.
     */
    const fetchEnquiries = async () => { 
        try {
            const response = await axios.get('http://localhost:8020/api/enquiries/view');
            if (response.data.status === 1) {
                setEnquiries(response.data.enquiryList); 
            } else {
                toast.error(response.data.message || "Failed to fetch enquiries."); 
            }
        } catch (error) {
            console.error("Error fetching enquiries:", error);
            toast.error("An error occurred while fetching enquiries.");
        }
    };

    /**
     * Handles the deletion of an enquiry by its ID.
     * @param {string} idToDelete - The unique ID of the enquiry to be deleted.
     */
    const handleDeleteEnquiry = async (idToDelete) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?")) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8020/api/enquiries/delete/${idToDelete}`);
            
            if (response.data.status === 1) {
                toast.success(response.data.message);
                fetchEnquiries(); // Re-fetch list after successful deletion to update UI
            } else {
                toast.error(response.data.message || "Failed to delete enquiry."); 
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error("Error: " + error.response.data.message); 
            } else {
                toast.error("An unexpected error occurred while deleting the enquiry."); 
            }
        }
    };

    /**
     * Handles populating the form with data for editing an existing enquiry.
     * @param {Object} enquiryData - The data of the enquiry to be edited.
     */
    const handleEditEnquiry = (enquiryData) => {
        setFormData({
            name: enquiryData.name,
            email: enquiryData.email,
            phone: enquiryData.phone,
            message: enquiryData.message,
            _id: enquiryData._id // This ID tells the form it's an update, not a new submission
        });
        toast.info("Enquiry loaded for editing.");
    };

    /**
     * useEffect Hook: Runs once when the component mounts to fetch initial data.
     */
    useEffect(() => {
        fetchEnquiries();
    }, []); 

    /**
     * Handles changes in form input fields (controlled components).
     * Updates the 'formData' state whenever an input value changes.
     */
    const getValue = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Handles the form submission (either saving a new enquiry or updating an existing one).
     */
    const saveEnquiry = async (e) => { 
        e.preventDefault(); // Prevent default form submission (page reload)

        try {
            let res;
            if (formData._id) {
                // If _id exists in formData, it's an UPDATE operation
                res = await axios.put(`http://localhost:8020/api/enquiries/update/${formData._id}`, formData);
                toast.success('Enquiry Updated Successfully!');
            } else {
                // Otherwise, it's an INSERT operation
                res = await axios.post("http://localhost:8020/api/enquiries/insert", formData);
                toast.success('Enquiry Submitted Successfully!');
            }
            
            console.log("Response:", res.data); // Log the response data from the backend
            
            // Clear the form fields by resetting 'formData' state
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                _id: '' // Clear the _id as well
            });

            fetchEnquiries(); // Re-fetch the list to display the updated/new entry

        } catch (error) {
            console.error("Error saving/updating enquiry:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error("Error: " + error.response.data.message); // Show specific error from backend
            } else {
                toast.error("An unexpected error occurred. Please try again."); // Generic error
            }
        }
    };

    return (
        <div>
            {/* ToastContainer: This component is where all your toast messages will appear. */}
            {/* Place it high up in your component tree, typically in App.jsx or main layout. */}
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />

            <h1 className='text-[40px] text-center py-6 font-bold'>User Enquiry</h1>

            <div className='max-w-6xl mx-auto my-8 border rounded-lg shadow-lg p-6 bg-white'>
                <div className='grid grid-cols-1 md:grid-cols-[30%_auto] gap-10'>

                    {/* LEFT COLUMN: Enquiry Form Section */}
                    <div className='bg-gray-200 p-4 rounded-md'>
                        <h2 className='text-2xl font-bold mb-4'>Enquiry Form</h2> {/* Increased font size */}
                        <form onSubmit={saveEnquiry}>
                            <div className='mb-4'>
                                <Label htmlFor="name" value="Your Name" className="mb-2 block" />
                                <TextInput
                                    type="text"
                                    value={formData.name} 
                                    onChange={getValue}  
                                    id="name"
                                    name='name'
                                    placeholder="Enter your Name"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor="email" value="Your Email" className="mb-2 block" />
                                <TextInput
                                    type="email"
                                    value={formData.email}
                                    onChange={getValue}
                                    id="email"
                                    name='email'
                                    placeholder="Enter your Email"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor="phone" value="Your Phone" className="mb-2 block" />
                                <TextInput
                                    type="tel"
                                    value={formData.phone}
                                    onChange={getValue}
                                    id="phone"
                                    name='phone'
                                    placeholder="Enter your phone"
                                    required
                                />
                            </div>
                            <div className='mb-6'>
                                <Label htmlFor="message" value="Your Message" className="mb-2 block" />
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={getValue}
                                    name='message'
                                    placeholder="Message... "
                                    required
                                    rows={4}
                                />
                            </div>
                            <div>
                                <Button type="submit" className='w-full'>
                                    {/* Conditional text for the submit button */}
                                    {formData._id ? 'Update Enquiry' : 'Save Enquiry'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Enquiry List (Table) Section */}
                    {/* Pass the 'enquiries' state as 'data' and the handler functions */}
                    <EnquiryList data={enquiries} onDelete={handleDeleteEnquiry} onEdit={handleEditEnquiry} />
                </div>
            </div>
        </div>
    );
}