# Authentication Setup Guide

## ✅ Admin User Created

An admin user has been successfully created with the following credentials:

### Default Admin Credentials

```
Username: admin
Password: Admin@2024!
```

⚠️ **IMPORTANT SECURITY NOTES:**
- Change the password immediately after first login
- Keep these credentials secure and do not share them
- These credentials provide full access to the system

## 🔐 Security Features Implemented

### Backend Security
1. **JWT Token Authentication**: All API requests require a valid JWT token
2. **Password Hashing**: Passwords are hashed using bcrypt (10 salt rounds)
3. **Protected Routes**: All ticket routes require authentication
4. **Token Expiration**: Tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`)

### Frontend Security
1. **Token Storage**: JWT tokens stored in localStorage
2. **Protected Routes**: Dashboard and ticket pages require authentication
3. **Automatic Logout**: Invalid/expired tokens trigger automatic logout
4. **Secure API Calls**: All API requests include Authorization header

## 🚀 Getting Started

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

### 2. Start the Frontend Server

```bash
cd frontend
npm run dev
```

### 3. Login

1. Navigate to the login page
2. Enter the admin credentials:
   - Username: `admin`
   - Password: `Admin@2024!`
3. Click "Sign in"

## 📝 Environment Variables

Make sure your `backend/.env` file includes:

```env
MONGO_URI=mongodb://localhost:27017/ali_maternity_clinic
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

⚠️ **Important**: Change `JWT_SECRET` to a strong, random string in production!

## 🔧 Creating Additional Users

To create additional admin or staff users, you can:

1. Use MongoDB directly to insert users (passwords will be auto-hashed)
2. Create a similar script to `createAdmin.ts` for staff users
3. Build an admin panel for user management (future enhancement)

## 🛡️ Security Best Practices

1. **Change Default Password**: Change the admin password immediately
2. **Use Strong JWT Secret**: Generate a strong random string for `JWT_SECRET`
3. **HTTPS in Production**: Always use HTTPS in production environments
4. **Token Expiration**: Keep token expiration times reasonable (7 days default)
5. **Regular Security Audits**: Regularly review and update security measures

## 📚 API Endpoints

### Public Endpoints
- `POST /api/auth/login` - Login and get JWT token

### Protected Endpoints (Require JWT Token)
- `GET /api/auth/verify` - Verify token validity
- `POST /api/tickets` - Create ticket
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get ticket by ID
- `PATCH /api/tickets/:id/status` - Update ticket status

All protected endpoints require the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

## 🔄 Token Management

- Tokens are automatically stored in localStorage after login
- Tokens are automatically included in API requests
- Tokens are removed on logout
- Expired tokens trigger automatic logout

## ❓ Troubleshooting

### "Invalid token" error
- Token may have expired (7 days default)
- Token may be missing from localStorage
- Solution: Log in again

### "Access denied" error
- Token not included in request headers
- Token is invalid or expired
- Solution: Check if you're logged in, log in again if needed

### Cannot create admin user
- Make sure MongoDB is running
- Check MongoDB connection string in `.env`
- Run: `npm run create-admin` in the backend directory

