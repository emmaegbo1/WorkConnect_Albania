// config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// ✅ Enable debug logging only in development
if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", function (collectionName, method, query, doc) {
    const reqId = global.currentRequestId || "no-req-id";
    console.log(
      `[MongoDB][${reqId}] ${collectionName}.${method}`,
      JSON.stringify(query),
      doc
    );
  });
}

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("🔻 MongoDB disconnected");
};















// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ MongoDB connected successfully');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// // Graceful shutdown
// const disconnectDB = async () => {
//   try {
//     await mongoose.connection.close();
//     console.log('🛑 MongoDB connection closed');
//   } catch (err) {
//     console.error('⚠️ Error closing MongoDB connection:', err.message);
//   }
// };

// export { connectDB, disconnectDB };