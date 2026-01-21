import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ali_maternity_clinic';

// Default admin credentials
const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'Admin@2024!';

async function createAdminUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: DEFAULT_ADMIN_USERNAME });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Username: ${DEFAULT_ADMIN_USERNAME}`);
      console.log('   If you want to reset the password, delete the user first.');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      username: DEFAULT_ADMIN_USERNAME,
      password: DEFAULT_ADMIN_PASSWORD,
      role: 'admin',
      isActive: true,
    });

    await admin.save();

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Admin Credentials:');
    console.log(`   Username: ${DEFAULT_ADMIN_USERNAME}`);
    console.log(`   Password: ${DEFAULT_ADMIN_PASSWORD}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('⚠️  Keep these credentials secure and do not share them.\n');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();

