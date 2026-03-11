LST - Local Service Trading Platform
A full-stack web application that connects customers with local service providers (workers) for home services like plumbing, cleaning, repairs, and more.

Features
User Authentication: Separate registration & login for customers and workers
Service Booking: Customers can book workers, workers can accept/complete bookings
Ratings & Reviews: Users can rate workers and provide feedback
Profile Management: Workers showcase their skills, pricing, and service details
Admin Panel: Admin can verify workers and manage platform ratings
Payment Integration: Razorpay for secure payment processing
Image Upload: Cloudinary integration for profile pictures
Persistent Authentication: Redux with Redux-Persist for session management
Tech Stack
Frontend:

React 19 + Vite
Redux Toolkit with Redux-Persist
React Router v7 for routing
Axios for API calls
Tailwind CSS for styling
Backend:

Node.js + Express.js
MongoDB with Mongoose
JWT Authentication
Bcryptjs for password hashing
Multer for file uploads
Infrastructure:

Cloudinary for image storage
Razorpay for payment processing
PM2 for process management
Project Structure
client - React frontend with Redux state management
server - Express API with MongoDB models and controllers
