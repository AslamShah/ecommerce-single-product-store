# Production Checklist

## Changes Applied (2026-04-26)

### Phase 1: Fixed Fetch Error - COMPLETED
1. **Fixed JWT Configuration**: Updated `backend/src/auth/auth.module.ts` and `jwt.strategy.ts` to use ConfigService for JWT_SECRET instead of hardcoded values. This was the root cause of the 401 Unauthorized errors.
2. **Added Auth Token to API Calls**: Updated `src/lib/api.ts` to include the Authorization header with the JWT token from localStorage for all API requests. This fixed the "Failed to fetch" error in admin panel.
3. **Fixed Health Controller Route**: Updated `backend/src/health.controller.ts` to use `@Controller('health')` instead of `@Controller('api/health')` to avoid double `/api/api/` prefix.
4. **Added In-Memory MongoDB**: Added `mongodb-memory-server` as dev dependency and configured `USE_IN_MEMORY_MONGODB=true` in `.env` for Codespaces development without local MongoDB.
5. **Updated Next.js Config**: Added `output: 'standalone'` and environment variable support for API URL in `next.config.ts`.

### Phase 2: Missing Pages & Broken Functionality - COMPLETED
- ✅ Admin login page exists at `/admin/login`
- ✅ Admin dashboard exists at `/admin/dashboard`  
- ✅ Admin products page exists at `/admin/products`
- ✅ Shop page exists at `/shop`
- ✅ Product detail page exists at `/product/[id]`
- ✅ Checkout page exists at `/checkout`
- ✅ Custom 404 page at `/not-found`
- ✅ Global error page at `/global-error`
- ✅ All API endpoints returning correct data
- ✅ Authentication flow working

### Phase 3: Production Hardening Applied - COMPLETED
1. **Environment Variables**: 
   - Created `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:3001/api`
   - Created `.env.example` for production reference
   - Backend `.env` with proper CORS origins configuration

2. **Security**: 
   - CORS restricted to specific origins in backend
   - Helmet middleware for security headers
   - Input validation via class-validator (whitelist mode)
   - Rate limiting via @nestjs/throttler (configured in app.module.ts)
   - JWT authentication for protected routes

3. **Build Configuration**:
   - Next.js: `output: 'standalone'` for containerized deployment
   - Backend: `nest build` produces dist/ folder

4. **Process Management**: 
   - Package.json scripts for dev and prod
   - `concurrently` for running both servers in dev

5. **Logging**: 
   - NestJS built-in logger with multiple log levels
   - Winston/Pino available via NestJS logging

6. **Health Checks**: 
   - GET `/api/health` returns MongoDB status
   - GET `/api/health/ready` for readiness checks

7. **Graceful Shutdown**: 
   - SIGTERM and SIGINT handlers in main.ts

## Verification Results
- ✅ Product creation: Working via admin panel
- ✅ API connectivity: Backend responding correctly  
- ✅ All pages: Accessible and functional
- ✅ Security headers: CORS properly configured
- ✅ Health check: Returns MongoDB connection status
- ✅ Production build: Completes without errors

## Admin Credentials
- Email: admin@apexprecision.com
- Password: ApexAdmin2024!

## How to Run

### Development (in Codespaces)
```bash
# Start both frontend and backend
npm run dev
# Or separately:
npm run dev:frontend  # Terminal 1 - runs on port 3000
cd backend && npm run start:dev  # Terminal 2 - runs on port 3001
```

### Production Build
```bash
# Build both
npm run build

# Run backend
cd backend && npm run start:prod

# Run frontend
npm run start
```

### Using PM2
```bash
# Backend
cd backend && pm2 start dist/main.js --name backend

# Frontend  
pm2 start "npm run start" --name frontend
```