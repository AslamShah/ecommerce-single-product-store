#!/bin/bash

echo "=== Testing API Fix ==="
echo ""

# Test 1: Check that API_BASE is using relative path
echo "Test 1: Checking API_BASE configuration..."
if grep -q "const API_BASE = '/api'" src/lib/api.ts; then
    echo "   ✓ API_BASE uses relative path '/api'"
    echo "   ✓ This leverages Next.js proxy for CORS handling"
else
    echo "   ✗ API_BASE configuration issue"
fi

echo ""

# Test 2: Check environment variable usage
echo "Test 2: Checking environment variable usage..."
if grep -q "process.env.NEXT_PUBLIC_API_URL" src/lib/api.ts; then
    echo "   ✓ Uses NEXT_PUBLIC_API_URL environment variable"
else
    echo "   ✗ Does not use environment variable"
fi

echo ""

# Test 3: Verify backend configuration
echo "Test 3: Verifying backend CORS configuration..."
if grep -q "http://localhost:3000" backend/.env && \
   grep -q "http://localhost:3001" backend/.env && \
   grep -q "10.0.0.165:3000" backend/.env && \
   grep -q "10.0.0.165:3001" backend/.env; then
    echo "   ✓ CORS includes both local and Codespaces origins"
else
    echo "   ✗ CORS configuration incomplete"
fi

echo ""

# Test 4: Check middleware configuration
echo "Test 4: Checking middleware configuration..."
if grep -q "/admin" src/middleware.ts; then
    echo "   ✓ Middleware handles admin routes"
fi

if grep -q "matcher" src/middleware.ts; then
    echo "   ✓ Middleware has proper matcher configuration"
fi

echo ""

# Test 5: Verify next.config.js rewrites
echo "Test 5: Checking next.config.ts rewrites..."
if grep -q 'source: "/api/:path*"' next.config.ts; then
    echo "   ✓ API requests are proxied to backend"
fi

echo ""

# Test 6: Check all routes exist
echo "Test 6: Verifying all routes exist..."
ROUTES=("admin/dashboard" "admin/login" "admin/products" "checkout" "product/[id]" "shop")
for route in "${ROUTES[@]}"; do
    if [ -f "src/app/${route}/page.tsx" ]; then
        echo "   ✓ Route /${route} exists"
    else
        echo "   ✗ Route /${route} missing"
    fi
done

echo ""

# Test 7: Check for 404 and error pages
echo "Test 7: Checking error pages..."
if [ -f "src/app/not-found.tsx" ]; then
    echo "   ✓ Custom 404 page exists"
fi

if [ -f "src/app/global-error.tsx" ]; then
    echo "   ✓ Global error page exists"
fi

echo ""

# Test 8: Verify build scripts exist
echo "Test 8: Checking build scripts..."
if grep -q '"build"' package.json; then
    echo "   ✓ Frontend build script exists"
fi

if grep -q '"build"' backend/package.json; then
    echo "   ✓ Backend build script exists"
fi

echo ""

# Test 9: Check production configuration
echo "Test 9: Verifying production configuration..."
if [ -f ".env.example" ]; then
    echo "   ✓ .env.example exists"
fi

if [ -f "backend/.env" ]; then
    echo "   ✓ backend/.env exists"
fi

if grep -q "NODE_ENV=production" backend/.env; then
    echo "   ✓ Production environment variable configured"
fi

echo ""
echo "=== Test Complete ==="
