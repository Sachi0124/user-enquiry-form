# 📩 User Enquiry Form

A full-stack web application for collecting user enquiries. Built with the **MERN** stack (MongoDB, Express, React, Node.js), this app provides a clean UI and handles form submissions efficiently.

---

## 🚀 Features
- Interactive enquiry form
- Backend form validation
- Stores data in MongoDB
- Responsive UI using React
- REST API using Express.js

---

## 🛠 Tech Stack
- Frontend: React, Tailwind CSS (or your CSS framework)
- Backend: Node.js, Express.js
- Database: MongoDB

---

## 📂 Folder Structure
user-enquiry-form
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx  (or your main entry component)
│   │   ├── Enquiry.jsx  <-- This file
│   │   ├── enquiry/
│   │   │   └── EnquiryList.jsx  <-- This file
│   │   ├── index.css  (or App.css, where Tailwind's output is imported)
│   │   └── main.jsx   (or index.js, your React entry point)
│   ├── package.json
│   └── tailwind.config.js
│
└── server/
    ├── APP/
    │   ├── controller/
    │   │   └── web/
    │   │       └── enquiryController.js  <-- This file
    │   ├── model/
    │   │   └── enquiry.model.js  <-- This file (Important: Make sure this exists!)
    │   └── routes/
    │       └── web/
    │           └── enquiryRoutes.js  <-- This file
    ├── config/
    │   └── db.js  (Assuming you have a database connection file, though not detailed here)
    ├── index.js  <-- This file (Your main server entry point)
    ├── package.json
    └── .env (optional, for environment variables like MongoDB URI)

    1️⃣Start Frontend:-
     cd client
     npm install
     npm start
     npm run dev

     2️⃣Start Backend
     cd server
     node index.js

     📸 Screenshot
     ![image](https://github.com/user-attachments/assets/370cc475-068c-42bb-bfbd-9d727f3b15c3)


     
