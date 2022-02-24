import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.MONGO_DB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDb;
