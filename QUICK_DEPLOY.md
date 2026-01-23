# Quick Deployment Checklist

Follow these steps in order to deploy your clinic app to free hosting.

## ✅ Step 1: MongoDB Atlas (5 minutes)

1. **Sign up**: https://www.mongodb.com/cloud/atlas/register
   - Use: ayeshatoor2001@gmail.com
   - Choose **FREE (M0)** tier

2. **Create Cluster**:
   - Click "Build a Database"
   - Choose FREE tier
   - Wait 3-5 minutes

3. **Database Access**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `clinicadmin`
   - Password: Generate strong password (SAVE IT!)
   - Click "Add User"

4. **Network Access**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your database user credentials
   - Add database name: `?retryWrites=true&w=majority` → `?retryWrites=true&w=majority&appName=AliMaternityClinic`
   - **SAVE THIS STRING** - You'll need it for Render

---

## ✅ Step 2: Deploy Backend to Render (10 minutes)

1. **Sign up**: https://render.com
   - Connect with your **personal GitHub account**

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect repository: **AliMaternityClinic**
   - Root Directory: **backend**
   - Name: `ali-maternity-clinic-backend`
   - Environment: **Node**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: **Free**

3. **Add Environment Variables** (in Render dashboard):
   ```
   MONGO_URI=your_mongodb_atlas_connection_string_from_step_1
   PORT=10000
   JWT_SECRET=generate_strong_random_string_here
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   ```

   **To generate JWT_SECRET**, run in terminal:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and use it as JWT_SECRET.

4. **Deploy**:
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Once done, you'll get URL like: `https://ali-maternity-clinic-backend.onrender.com`
   - **SAVE THIS URL** - You'll need it for frontend

5. **Test Backend**:
   - Visit: `https://your-backend-url.onrender.com/`
   - Should see: `{"message":"Ali Maternity Clinic API is running"}`

---

## ✅ Step 3: Deploy Frontend to Vercel (5 minutes)

1. **Sign up**: https://vercel.com
   - Connect with your **personal GitHub account**

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import **AliMaternityClinic** repository
   - Root Directory: **frontend**
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build` (auto)
   - Output Directory: `dist` (auto)

3. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Replace `your-backend-url.onrender.com` with your actual Render URL from Step 2

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get URL like: `https://ali-maternity-clinic.vercel.app`
   - **THIS IS YOUR LIVE APP URL! 🎉**

---

## ✅ Step 4: Create Admin User on Live Server

After backend is deployed, create admin user:

### Option A: Using Render Shell (Recommended)
1. Go to Render dashboard → Your backend service
2. Click **"Shell"** tab
3. Run:
   ```bash
   npm run create-admin
   ```
4. You'll see admin credentials printed

### Option B: Manual MongoDB Insert
1. Go to MongoDB Atlas → Your cluster
2. Click "Browse Collections"
3. Create database: `ali_maternity_clinic`
4. Create collection: `users`
5. Insert document (password will be auto-hashed on first login, but better to use Option A)

---

## ✅ Step 5: Test Your Live App

1. Visit your Vercel URL
2. Login with:
   - Username: `admin`
   - Password: `Admin@2024!` (or password from create-admin script)
3. Test creating a ticket
4. Everything should work! 🎊

---

## 🔄 Updating Your App

After making changes:

1. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Render and Vercel will automatically redeploy** (connected to GitHub)

---

## 📝 Important URLs to Save

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Live App**: `https://your-app.vercel.app`
- **Your Backend API**: `https://your-backend.onrender.com`

---

## ⚠️ Free Tier Limitations

- **Render**: Spins down after 15 min inactivity (first request takes ~30 sec)
- **Vercel**: Unlimited, fast CDN
- **MongoDB Atlas**: 512MB storage (enough for thousands of tickets)

---

## 🆘 Troubleshooting

**Backend not connecting?**
- Check MongoDB Atlas Network Access (must allow 0.0.0.0/0)
- Verify connection string has correct username/password

**Frontend can't reach backend?**
- Check VITE_API_URL in Vercel matches your Render URL
- Make sure URL ends with `/api`

**Admin login not working?**
- Make sure you created admin user on live database (not local)
- Check Render logs for errors

