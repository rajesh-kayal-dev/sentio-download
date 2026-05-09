import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    console.log('✦ Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });
    console.log(`\x1b[32m%s\x1b[0m`, `✦ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `✖ MongoDB Connection Error: ${error.message}`);
    return false;
  }
};

export default connectDB;
