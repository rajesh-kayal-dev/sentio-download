import mongoose from 'mongoose';

/**
 * Cached connection object for serverless environments
 */
let cachedConnection = null;

/**
 * Connects to MongoDB with production-grade settings
 * Optimized for serverless (Vercel) environments
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Database Connection Error: MONGODB_URI environment variable is missing.');
    return false;
  }

  // If we already have a connection, reuse it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    console.log('Connecting to database...');
    
    // Masked URI for secure logging
    const maskedUri = uri.replace(/\/\/.*@/, '//****:****@');
    
    // Use the cached promise if it exists to avoid multiple connection attempts
    if (!cachedConnection) {
      cachedConnection = mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000, // Increase timeout for cold starts
        autoIndex: true,
        family: 4, // Force IPv4 to avoid DNS/Network issues in some environments
      });
    }

    await cachedConnection;
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Database Connection Failed: ${error.message}`);
    cachedConnection = null; // Reset cache on failure
    return false;
  }
};

export default connectDB;

