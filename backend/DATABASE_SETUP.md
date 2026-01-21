# Database Setup Guide

## MongoDB Connection

This project uses MongoDB to store ticket data. You can use the same MongoDB instance (`localhost:27017`) for multiple projects - each project uses a different **database name**.

## Setup Instructions

### 1. Create Environment File

Create a `.env` file in the `backend` folder with the following content:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ali_maternity_clinic

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### 2. Database Name

The database name is `ali_maternity_clinic`. This means:
- ✅ You can use the same MongoDB instance (`localhost:27017`) for other projects
- ✅ Each project will have its own database (different names)
- ✅ No conflicts between projects

### 3. Verify MongoDB is Running

Make sure MongoDB is running on your system:

**Windows:**
- Check if MongoDB service is running in Services
- Or run: `mongod` in a terminal

**Verify connection:**
```bash
# Test MongoDB connection (optional)
mongosh
# Then type: show dbs
```

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB
Backend server is running on port 5000
```

### 5. Database Structure

The project will automatically create:
- **Database:** `ali_maternity_clinic`
- **Collection:** `tickets` (created automatically when first ticket is saved)

## Troubleshooting

### Connection Error?
- Make sure MongoDB is running: Check Services (Windows) or run `mongod`
- Verify port 27017 is not blocked
- Check if another application is using port 5000

### Multiple Projects?
- Each project uses a different database name
- Example:
  - Project 1: `mongodb://localhost:27017/project1_db`
  - Project 2: `mongodb://localhost:27017/project2_db`
  - This project: `mongodb://localhost:27017/ali_maternity_clinic`

## Connection String Format

```
mongodb://localhost:27017/database_name
```

- `localhost:27017` - MongoDB server address and port
- `database_name` - The database name (unique per project)

