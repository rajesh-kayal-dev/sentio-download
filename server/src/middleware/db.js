import connectDB from '../config/db.js';

/**
 * Middleware to ensure database is connected before processing requests
 */
const ensureDbConnected = async (req, res, next) => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed. Please try again later.'
      });
    }
    next();
  } catch (error) {
    console.error('DB Middleware Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during database connection.'
    });
  }
};

export default ensureDbConnected;
