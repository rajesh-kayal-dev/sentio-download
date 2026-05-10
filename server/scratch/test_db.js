import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('No MONGODB_URI found in .env');
  process.exit(1);
}

console.log('Testing connection to:', uri.replace(/\/\/.*@/, '//****:****@'));

async function test() {
  try {
    console.log('Attempting to connect...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Successfully connected to MongoDB!');
    console.log('Connection Host:', mongoose.connection.host);
    await mongoose.disconnect();
    console.log('Disconnected.');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed!');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    if (err.message.includes('ETIMEDOUT') || err.message.includes('ECONNREFUSED')) {
      console.error('\nPOSSIBLE CAUSE: Your IP might not be whitelisted in MongoDB Atlas.');
    }
    process.exit(1);
  }
}

test();
