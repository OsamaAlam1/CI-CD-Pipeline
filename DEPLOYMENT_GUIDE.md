# Deployment Guide - Ali Maternity Clinic

This guide will help you deploy your MERN stack application to free hosting services.

## Services We'll Use

1. **MongoDB Atlas** - Free cloud database (512MB)
2. **Render** - Free backend hosting (Node.js)
3. **Vercel** - Free frontend hosting (React)

---

## Step 1: Set Up MongoDB Atlas (Free Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with your **personal email** (ayeshatoor2001@gmail.com)
3. Choose **Free tier (M0)** - it's completely free

### 1.2 Create a Cluster
1. After signup, click **"Build a Database"**
2. Choose **FREE** (M0) tier
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create"** (takes 3-5 minutes)

### 1.3 Set Up Database Access
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `clinicadmin` (or any username)
5. Password: Generate a strong password (save it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.4 Set Up Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for now - you can restrict later)
   - Or add `0.0.0.0/0` manually
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` with your database username
6. Replace `<password>` with your database password
7. Add database name at the end: `?retryWrites=true&w=majority` → `?retryWrites=true&w=majority&appName=AliMaternityClinic`
8. **Save this connection string** - you'll need it for backend deployment

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with your **personal GitHub account** (connect GitHub)
3. Verify your email

### 2.2 Create New Web Service
1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Select **"AliMaternityClinic"** repository
   - Choose **"backend"** as the root directory
3. Configure the service:
   - **Name**: `ali-maternity-clinic-backend` (or any name)
   - **Environment**: **Node**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

### 2.3 Set Environment Variables
In Render dashboard, go to **"Environment"** tab and add:

```
MONGO_URI=your_mongodb_atlas_connection_string_here
PORT=10000
JWT_SECRET=generate_a_strong_random_string_here
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**Important:**
- Replace `your_mongodb_atlas_connection_string_here` with the connection string from Step 1.5
- For `JWT_SECRET`, generate a strong random string (you can use: `openssl rand -base64 32` or any password generator)

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Build your app
   - Start the server
3. Wait for deployment (3-5 minutes)
4. Once deployed, you'll get a URL like: `https://ali-maternity-clinic-backend.onrender.com`
5. **Save this URL** - you'll need it for frontend

### 2.5 Test Backend
Visit: `https://your-backend-url.onrender.com/`
Should see: `{"message":"Ali Maternity Clinic API is running"}`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with your **personal GitHub account**
3. Import your **AliMaternityClinic** repository

### 3.2 Configure Project
1. Vercel will detect it's a React app
2. **Root Directory**: Select **"frontend"**
3. **Framework Preset**: Vite (auto-detected)
4. **Build Command**: `npm run build` (auto-filled)
5. **Output Directory**: `dist` (auto-filled)

### 3.3 Set Environment Variables
Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll get a URL like: `https://ali-maternity-clinic.vercel.app`
4. **This is your live application URL!**

---

## Step 4: Create Admin User on Live Server

After deployment, you need to create the admin user on the live database.

### Option A: Using Render Shell
1. Go to Render dashboard → Your backend service
2. Click **"Shell"** tab
3. Run:
```bash
cd backend
npm run create-admin
```

### Option B: Using MongoDB Atlas
1. Go to MongoDB Atlas → Your cluster
2. Click **"Browse Collections"**
3. Create database: `ali_maternity_clinic`
4. Create collection: `users`
5. Insert document:
```json
{
  "username": "admin",
  "password": "Admin@2024!",
  "role": "admin",
  "isActive": true
}
```
**Note:** Password will be auto-hashed by the app, but for direct DB insert, you'd need to hash it first. Better to use Option A.

---

## Step 5: Test Your Live Application

1. Visit your Vercel frontend URL
2. Try logging in with:
   - Username: `admin`
   - Password: `Admin@2024!` (or the password you set)
3. Test creating a ticket
4. Everything should work!

---

## Important Notes

### Free Tier Limitations

**Render (Backend):**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds (cold start)
- 750 hours/month free

**Vercel (Frontend):**
- Unlimited deployments
- Fast CDN
- No cold starts

**MongoDB Atlas:**
- 512MB storage (free)
- Shared cluster (may be slower during peak times)

### Updating Your Application

1. **Make changes** in your local code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. **Render and Vercel will automatically redeploy** (connected to GitHub)

### Environment Variables

Keep these **secret** and never commit them to GitHub:
- `MONGO_URI`
- `JWT_SECRET`

They're stored securely in Render/Vercel dashboards.

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas Network Access (allow all IPs)
- Verify connection string has correct username/password
- Check Render logs for errors

### Frontend can't reach backend
- Verify `VITE_API_URL` in Vercel matches your Render backend URL
- Check CORS settings (should be fine, we already have `cors()` enabled)

### Admin user not working
- Make sure you created admin user on live database (not local)
- Check MongoDB Atlas to see if user exists

---

## URLs to Save

- **MongoDB Atlas Dashboard**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Live App**: `https://your-app.vercel.app`
- **Your Backend API**: `https://your-backend.onrender.com`

---

## Next Steps (Optional)

1. **Custom Domain**: Add your own domain to Vercel (free)
2. **SSL Certificates**: Automatically provided by Vercel/Render
3. **Monitoring**: Set up error tracking (Sentry free tier)
4. **Backups**: Set up MongoDB Atlas automated backups

