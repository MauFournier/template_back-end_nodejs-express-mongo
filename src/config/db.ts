import mongoose from 'mongoose';

const connectDB = async (dbURI: string): Promise<void> => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An error occurred while connecting to MongoDB');
    }
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
