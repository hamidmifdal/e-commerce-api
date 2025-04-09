import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

/**
 * Connect to MongoDB with retry logic
 */
export const connectDB = async () => {
	try {
		const db = await mongoose.connect(MONGO_URI);
		console.log(' MongoDB connected successfully ===>',db.connection.name);
	} catch (error) {
		console.error(' MongoDB connection error:', error.message);
		process.exit(1); // Exit process with failure
	}
};
