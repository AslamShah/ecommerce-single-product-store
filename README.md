# Apex Precision E-Commerce Store

A production-ready e-commerce application with Next.js frontend and NestJS backend, running in GitHub Codespaces.

## Architecture

- **Frontend**: Next.js 16 (App Router) with TypeScript
- **Backend**: NestJS REST API with MongoDB
- **Database**: MongoDB (supports both local and Atlas, includes in-memory option for development)
- **Process Management**: PM2 (production)
- **Environment**: GitHub Codespaces

## Getting Started (Development in Codespaces)

### Quick Start

1. **Install dependencies** (already done in Codespaces):
   ```bash
   npm install
   cd backend && npm install
   ```

2. **Start the application**:
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api

### Admin Credentials

- Email: admin@apexprecision.com
- Password: ApexAdmin2024!

## Environment Configuration

### Backend (.env)
```env
# MongoDB - Use local, Atlas, or in-memory for development
MONGODB_URI=mongodb://localhost:27017/apex-precision
USE_IN_MEMORY_MONGODB=true  # Set to false when using real MongoDB

# JWT
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRATION=24h

# Stripe (optional - for payment processing)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Server
PORT=3001
HOST=0.0.0.0

# CORS - include your frontend URL
CORS_ORIGINS=http://localhost:3000,https://*.github.dev

# Rate limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Production Build

```bash
# Build both frontend and backend
npm run build

# Run in production mode
NODE_ENV=production npm start
```

### Manual Production Start

```bash
# Terminal 1 - Backend
cd backend && npm run start:prod

# Terminal 2 - Frontend
npm run start
```

## Running with PM2 (Production)

```bash
# Backend
cd backend && pm2 start dist/main.js --name backend

# Frontend
pm2 start "npm run start" --name frontend
```

## Health Check

```bash
# Check API health
curl http://localhost:3001/api/health

# Check MongoDB connection
curl http://localhost:3001/api/health | jq '.services.mongodb'
```

## Features

- ✅ Product catalog with filtering
- ✅ Shopping cart and checkout
- ✅ Order creation and tracking
- ✅ Admin authentication (JWT-based)
- ✅ Admin dashboard with order management
- ✅ Product management (CRUD)
- ✅ Health checks with MongoDB status
- ✅ Rate limiting (throttler)
- ✅ Global error handling
- ✅ Custom 404 page
- ✅ Production build support (standalone output)
- ✅ Environment-based configuration
- ✅ CORS configuration
- ✅ Helmet security headers

## Troubleshooting

### "Failed to fetch" error when creating products
1. Ensure backend is running on port 3001
2. Check that frontend can reach backend: `curl http://localhost:3001/api/health`
3. Verify `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001/api`
4. Check browser console for specific error messages

### MongoDB connection issues
- Set `USE_IN_MEMORY_MONGODB=true` in backend `.env` for in-memory development
- Or use MongoDB Atlas by setting `MONGODB_URI` to your Atlas connection string


<img width="2150" height="11838" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_" src="https://github.com/user-attachments/assets/2d12b428-22b8-4ac3-b2c8-8c074940d18d" />

<img width="2150" height="1026" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_admin_login" src="https://github.com/user-attachments/assets/76f334ae-6411-4077-ad5b-661e604fc74b" />

<img width="2150" height="5630" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_shop (4)" src="https://github.com/user-attachments/assets/e00596e2-5a1e-4a14-8dc5-8b7bd8ea4ebe" />

<img width="2150" height="4282" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_shop (2)" src="https://github.com/user-attachments/assets/e05338f6-5e28-4a5d-bd20-1eaaa0cb81e3" />

<img width="2150" height="2844" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_ (3)" src="https://github.com/user-attachments/assets/2657a707-ab13-4f18-8192-d1692080bf07" />

<img width="2150" height="3942" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_ (4)" src="https://github.com/user-attachments/assets/c81c2eb1-accc-4235-81c3-b771d1b41ab5" />

<img width="2150" height="1026" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_admin_login" src="https://github.com/user-attachments/assets/d6d4664b-9d3c-4c73-8fc4-8389b73aa1af" />

<img width="2150" height="1026" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_admin_login (1)" src="https://github.com/user-attachments/assets/e30a699c-c193-415b-90be-e5c945897a6b" />

<img width="2150" height="1026" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_admin_dashboard" src="https://github.com/user-attachments/assets/d3769169-2b96-47d0-86c0-e27ec6033068" />

<img width="2150" height="1474" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_admin_dashboard (1)" src="https://github.com/user-attachments/assets/8754901d-1d08-44d2-be09-7954503f7a50" />

<img width="2150" height="1026" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_admin_dashboard (2)" src="https://github.com/user-attachments/assets/5d741cec-2b82-480a-b413-2d115da179d3" />

<img width="2150" height="1026" alt="redesigned-space-broccoli-g74pq7vxpjgc97wq-3000 app github dev_admin_dashboard (3)" src="https://github.com/user-attachments/assets/ed751e20-d4b6-493a-8d31-8925a338dc48" />




