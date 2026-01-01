const express=require('express');
const dotenv=require('dotenv');

const connectDB=require('./config/db');
const authRoutes=require('./routes/auth.routes');
const bookingRoutes=require('./routes/booking.routes');
const RatingRoutes=require('./routes/rating.routes');
const adminRoutes=require('./routes/admin/admin.routes');
const adminAuthRoutes=require('./routes/admin/admin.auth.routes');

dotenv.config();

const app=express();

// Connect to Database
connectDB();
app.use(express.json()); //we do .json to parse json data in req body


//NGNIX
app.get("/", (req, res) => {
  res.json({
    message: "API running",
    port: PORT,
    pid: process.pid
  });
});
//this is for health check of server by nginx

// Routes

app.use('/api/auth',authRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/ratings',RatingRoutes);


// Admin Routes
app.use('/api/admin/auth',adminAuthRoutes);
app.use('/api/admin',adminRoutes);

// Start the server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});     



