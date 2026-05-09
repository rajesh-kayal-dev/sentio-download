import mongoose from 'mongoose';

/**
 * Connects to MongoDB with production-grade settings
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Database Connection Error: MONGODB_URI environment variable is missing.');
    return false;
  }

  try {
    console.log('Connecting to database...');
    
    // Masked URI for secure logging
    const maskedUri = uri.replace(/\/\/.*@/, '//****:****@');
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      autoIndex: true,
      family: 4, // Force IPv4 to avoid DNS/Network issues
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Database Connection Failed: ${error.message}`);
    return false;
  }
};

export default connectDB;
