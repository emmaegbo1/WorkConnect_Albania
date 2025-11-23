// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error', err.message);
//     process.exit(1);
//   }
// };


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Graceful shutdown
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🛑 MongoDB connection closed');
  } catch (err) {
    console.error('⚠️ Error closing MongoDB connection:', err.message);
  }
};

module.exports = { connectDB, disconnectDB };
