const mongoose = require('mongoose');

const connectDB = async()=>{

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   }
).then(() => {
    console.log('MongoDB connected successfully');})
  .catch((err) => {
    console.error('MongoDB connection error:', err);  });


}

module.exports=connectDB;