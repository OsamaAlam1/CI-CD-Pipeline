# How to Start the Application

## Prerequisites
1. Make sure MongoDB is running on `localhost:27017`
2. Make sure you have Node.js installed

## Step 1: Start the Backend Server

Open a terminal/command prompt and run:

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB successfully!
🚀 Backend server is running on port 5000
📍 API URL: http://localhost:5000/api
```

**Keep this terminal open** - the backend server needs to keep running.

## Step 2: Start the Frontend Server

Open a **NEW** terminal/command prompt and run:

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## Step 3: Access the Application

1. Open your browser and go to: `http://localhost:5173`
2. Click "Login" button
3. Enter credentials:
   - **Username:** `admin`
   - **Password:** `Admin@2024!`

## Troubleshooting

### Error: `ERR_CONNECTION_REFUSED`
- **Solution:** Make sure the backend server is running (Step 1)
- Check if port 5000 is available
- Verify MongoDB is running

### Error: MongoDB connection failed
- **Solution:** Start MongoDB service
- On Windows: Check if MongoDB service is running in Services
- Verify connection string in `backend/.env`

### Error: Port already in use
- **Solution:** 
  - Backend: Change `PORT` in `backend/.env` or kill process on port 5000
  - Frontend: Vite will automatically use next available port

### Cannot login
- Verify admin user exists: Run `npm run create-admin` in backend directory
- Check browser console for specific error messages
- Verify backend is running and accessible

## Quick Check Commands

### Check if backend is running:
```bash
curl http://localhost:5000/
```
Should return: `{"message":"Ali Maternity Clinic API is running"}`

### Check if MongoDB is running:
```bash
mongosh
```
Should connect to MongoDB shell

