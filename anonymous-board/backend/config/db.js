const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Default to MongoDB Atlas URI or use a fallback for local development
    // For Render deployment, we'll set the MONGO_URI environment variable
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://anonymous-board-user:anonymous-board-password@cluster0.mongodb.net/anonymous-board?retryWrites=true&w=majority';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
