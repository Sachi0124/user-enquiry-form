import React from 'react';
// Ensure Button is imported for proper styling
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
// Optional: If you want icons inside the buttons, uncomment these lines and install react-icons:
// npm install react-icons
// import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

export function EnquiryList({ data, onDelete, onEdit }) { 
    return (
        <div className='bg-gray-200 p-4 rounded-md'>
            <h2 className='text-2xl font-bold mb-4'>Enquiry List</h2> {/* Increased font size */}
            <div className="overflow-x-auto">
                {/* Ensure ABSOLUTELY NO WHITESPACE (newlines, spaces, tabs) between Flowbite Table/TableHead/TableBody tags */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>SLNo</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                            <TableHeadCell>Message</TableHeadCell>
                            <TableHeadCell>Actions</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <TableRow key={item._id || index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.message}</TableCell>
                                    {/* Used space-x-3 for a small gap between buttons */}
                                    <TableCell className="flex items-center space-x-3">
                                        <Button 
                                            onClick={() => onEdit && onEdit(item)} 
                                            size="sm" 
                                            color="blue"
                                        >
                                            {/* Optional: Add icon here if using react-icons */}
                                            {/* <HiOutlinePencil className="mr-2 h-4 w-4" /> */}
                                            Edit
                                        </Button>
                                        <Button 
                                            onClick={() => onDelete && onDelete(item._id)} 
                                            size="sm" 
                                            color="red"
                                        >
                                            {/* Optional: Add icon here if using react-icons */}
                                            {/* <HiOutlineTrash className="mr-2 h-4 w-4" /> */}
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell colSpan="6" className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white py-4">
                                    No enquiries found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}