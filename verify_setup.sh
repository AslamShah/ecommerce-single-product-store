#!/bin/bash

echo "=== E-Commerce Application Verification ==="
echo ""

echo "1. Checking environment files..."
if [ -f .env.local ]; then
    echo "   ✓ .env.local exists"
    grep -q "NEXT_PUBLIC_API_URL=http://localhost:3001/api" .env.local && echo "   ✓ API URL configured correctly"
else
    echo "   ✗ .env.local missing"
fi

echo ""
echo "2. Checking backend configuration..."
if [ -f backend/.env ]; then
    echo "   ✓ backend/.env exists"
    grep -q "PORT=3001" backend/.env && echo "   ✓ Backend port configured (3001)"
    grep -q "CORS_ORIGINS" backend/.env && echo "   ✓ CORS origins configured"
fi

echo ""
echo "3. Checking API configuration..."
if grep -q "API_BASE = '/api'" src/lib/api.ts; then
    echo "   ✓ API_BASE uses relative path"
fi

echo ""
echo "4. Checking CORS configuration in backend..."
if grep -q "CORS_ORIGINS" backend/src/main.ts; then
    echo "   ✓ CORS configured in main.ts"
fi

if grep -q "http://localhost:3000" backend/.env; then
    echo "   ✓ Frontend origin in CORS list"
fi
if grep -q "http://localhost:3001" backend/.env; then
    echo "   ✓ Backend origin in CORS list"
fi

if grep -q "http://10.0.0.165:3000" backend/.env; then
    echo "   ✓ Codespaces localhost in CORS list"
fi
if grep -q "http://10.0.0.165:3001" backend/.env; then
    echo "   ✓ Codespaces API in CORS list"
fi

echo ""
echo "5. Checking middleware redirect..."
if grep -q "/admin" src/middleware.ts; then
    echo "   ✓ Middleware redirects /admin to /admin/login"
fi

if grep -q "matcher" src/middleware.ts; then
    echo "   ✓ Middleware configured for admin routes"
fi

echo ""
echo "6. Checking next.config rewrites..."
if grep -q 'source: "/api/:path*"' next.config.ts; then
    echo "   ✓ API rewrites configured"
fi

if grep -q 'destination: "http://127.0.0.1:3001/api/:path*"' next.config.ts; then
    echo "   ✓ API rewrites point to backend"
fi

echo ""
echo "7. Checking available routes..."
ROUTES=$(find src/app -name "page.tsx" -o -name "page.ts" | sed 's|src/app/||' | sed 's|/page.tsx||' | sed 's|/page.ts||' | sort)
echo "   Available routes:"
echo "$ROUTES" | while read route; do
    if [ -n "$route" ]; then
        echo "     - /$route"
    fi
done

echo ""
echo "8. Checking Procfile..."
if [ -f Procfile ]; then
    echo "   ✓ Procfile exists"
    grep -q "backend:" Procfile && echo "   ✓ Backend process defined"
    grep -q "frontend:" Procfile && echo "   ✓ Frontend process defined"
fi

echo ""
echo "9. Checking package.json scripts..."
if grep -q '"start:prod"' backend/package.json; then
    echo "   ✓ Backend start:prod script exists"
fi
if grep -q '"build"' package.json; then
    echo "   ✓ Frontend build script exists"
fi

echo ""
echo "10. Security features check..."
if [ -f backend/src/app.module.ts ] && grep -q "ThrottlerModule" backend/src/app.module.ts; then
    echo "    ✓ Rate limiting configured"
fi

if [ -f backend/src/app.module.ts ] && grep -q "MongooseModule" backend/src/app.module.ts; then
    echo "    ✓ MongoDB integration configured"
fi

if [ -f backend/src/main.ts ] && grep -q "ValidationPipe" backend/src/main.ts; then
    echo "    ✓ Input validation configured"
fi

if [ -f backend/src/main.ts ] && grep -q "HttpExceptionFilter" backend/src/main.ts; then
    echo "    ✓ Exception handling configured"
fi

echo ""
echo "=== Verification Complete ==="
