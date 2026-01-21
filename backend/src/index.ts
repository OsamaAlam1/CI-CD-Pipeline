import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Ali Maternity Clinic API is running' });
});

// Routes
import ticketRoutes from './routes/ticketRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection (you can change the URI later)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ali_maternity_clinic';

async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    console.log(`MongoDB URI: ${MONGO_URI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials if any
    
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB successfully!');
    console.log(`📊 Database: ${MONGO_URI.split('/').pop()}`);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend server is running on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}/api`);
    });
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MongoDB is running on localhost:27017');
    console.error('   2. Check if MongoDB service is started');
    console.error('   3. Verify your connection string in .env file');
    process.exit(1);
  }
}

startServer();


