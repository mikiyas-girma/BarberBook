# BarberBook Web App

Welcome to BarberBook Web App repository! This project is a web application that is built for barbers and customers to book appointments. The application is built using ReactJS, ExpressJS, MongoDB. The frontend is built using ReactJS with TypeScript and Vite for build tooling. The backend is built using ExpressJS with TypeScript, MongoDB for the database.

## [Link to Video here](https://www.youtube.com/watch?v=Q1Q1Q1Q1Q1Q)

<!-- ## API Docs here -->


## Table of Contents

- [BarberBok Web App](#BarberBook)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Developers](#developers)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [APIs and Libraries](#apis-and-libraries)
    - [Frontend Libraries/API](#tools-used-for-the-frontend)
    - [Backend Libraries/API](#tools-used-for-the-backend)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview

BarberBook Web App is a project developed by aiming to provide a platform for users to book appointments with barbers and hair stylists. The application features a user-friendly interface for booking appointments, viewing available services, and managing schedules. The application also includes a dashboard for barbers to manage their schedules and appointments.

## Developers

- [Mikiyas Girma](https://github.com/mikiyas-girma)

## Features

- **User Authentication**: Users can sign up and log in to the application.
- **Barber Authentication**: Barbers can sign up and log in to the application.
- **Barber Dashboard**: Barbers can view and manage their schedules and appointments.
- **Barber Schedule**: Barbers can set their availability and working hours.
- **Appointment Booking**: Users can book appointments with barbers.
- **Barber Portfolio**: Barbers can showcase their work and services.


## Tech Stack

### Frontend

- ReactJS with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Redux for state management

### Backend

- ExpressJS with TypeScript
- MongoDB for database

## APIs and Libraries

### Tools used for the frontend

- [Axios](https://axios-http.com/docs/intro) for HTTP requests
- [date-fns](https://date-fns.org/) for date manipulation
- [shadcn/components](https://ui.shadcn.com/) for reusable UI components
- [Aceternity Components](https://ui.aceternity.com/components) for additional UI components
- [TailwindCSS](https://v2.tailwindcss.com/docs) for utility-first CSS framework
- [Vite](https://vite.dev/) for fast and optimized development
- [Lucide React Icons](https://react-icons.github.io/react-icons/icons/lu/) for iconography
- [React Redux](https://react-redux.js.org/) for state management
- [React Router](https://reactrouter.com/en/main) for routing and navigation

### Tools used for the backend


- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- [cloudinary](https://cloudinary.com/) for image storage and manipulation
- [express](https://expressjs.com/) for building the backend server
- [jsonwebtoken](https://jwt.io/) for authentication
- [mongoose](https://mongoosejs.com/) for MongoDB object modeling
- [morgan](https://www.npmjs.com/package/morgan) for HTTP request logging
- [multer](https://www.npmjs.com/package/multer) for handling file uploads
- [nodemailer](https://www.npmjs.com/package/nodemailer) for sending emails
- [nodemailer-postmark-transport](https://www.npmjs.com/package/nodemailer-postmark-transport) for Postmark email transport
- [sharp](https://www.npmjs.com/package/sharp) for image processing
- [winston](https://www.npmjs.com/package/winston) for logging

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mikiyas-girma/BarberBook.git
   cd BarberBook
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

## Configuration


1. Create a `.env` file in the `backend` directory with:

   ```bash
    PORT='port number'
    MONGO_URI='your mongodb uri'
    JWT_SECRET='your jwt secret'
    POSTMARK_API_KEY='your postmark api key'
    EMAIL_FROM='your email'
    EMAIL_SERVICE='postmark'
    CLOUDINARY_NAME='your cloudinary name'
    CLOUDINARY_API_KEY='your cloudinary api key'
    CLOUDINARY_SECRET='your cloudinary secret'
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd backend && npm run dev
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   cd frontend && npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## Contributing

We welcome contributions to the BarberBook Web App! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

This project is licensed under a proprietary license. Unauthorized copying, distribution, modification, or any other use of the project is strictly prohibited without prior written consent from the author.

---

If you have any questions or issues, please open an issue in this repository.
