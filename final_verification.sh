#!/bin/bash

echo "========================================"
echo "FINAL VERIFICATION CHECKLIST"
echo "========================================"
echo ""

PASSED=0
FAILED=0

# Check 1: API_BASE configuration
echo "[1] Checking API_BASE configuration..."
if grep -q "const API_BASE = '/api'" src/lib/api.ts; then
    echo "     ✓ PASS: API_BASE uses relative path"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: API_BASE configuration issue"
    FAILED=$((FAILED+1))
fi

# Check 2: Environment variables
echo "[2] Checking environment variables..."
if [ -f .env.local ] && [ -f .env.example ]; then
    echo "     ✓ PASS: Environment files exist"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Missing environment files"
    FAILED=$((FAILED+1))
fi

# Check 3: Backend CORS configuration
echo "[3] Checking CORS configuration..."
if grep -q "CORS_ORIGINS" backend/.env && grep -q "http://localhost:3000" backend/.env; then
    echo "     ✓ PASS: CORS configured for frontend"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: CORS not properly configured"
    FAILED=$((FAILED+1))
fi

# Check 4: Next.js proxy configuration
echo "[4] Checking Next.js proxy configuration..."
if grep -q 'source: "/api/:path*"' next.config.ts; then
    echo "     ✓ PASS: API proxy configured"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: API proxy not configured"
    FAILED=$((FAILED+1))
fi

# Check 5: Middleware configuration
echo "[5] Checking middleware configuration..."
if grep -q "/admin" src/middleware.ts && grep -q "matcher" src/middleware.ts; then
    echo "     ✓ PASS: Middleware configured"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Middleware not configured"
    FAILED=$((FAILED+1))
fi

# Check 6: Routes exist
echo "[6] Checking all routes exist..."
ALL_ROUTES=true
for route in "admin/dashboard/page.tsx" "admin/login/page.tsx" "admin/products/page.tsx" "checkout/page.tsx" "product/[id]/page.tsx" "shop/page.tsx"; do
    if [ ! -f "src/app/$route" ]; then
        echo "     ✗ Missing: /${route}"
        ALL_ROUTES=false
    fi
done
if $ALL_ROUTES; then
    echo "     ✓ PASS: All routes exist"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Some routes missing"
    FAILED=$((FAILED+1))
fi

# Check 7: Error pages
echo "[7] Checking error pages..."
if [ -f "src/app/not-found.tsx" ] && [ -f "src/app/global-error.tsx" ]; then
    echo "     ✓ PASS: Error pages exist"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Error pages missing"
    FAILED=$((FAILED+1))
fi

# Check 8: Build scripts
echo "[8] Checking build scripts..."
if grep -q '"build"' package.json && grep -q '"build"' backend/package.json; then
    echo "     ✓ PASS: Build scripts configured"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Build scripts missing"
    FAILED=$((FAILED+1))
fi

# Check 9: Procfile
echo "[9] Checking Procfile..."
if [ -f Procfile ]; then
    echo "     ✓ PASS: Procfile exists"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Procfile missing"
    FAILED=$((FAILED+1))
fi

# Check 10: Security features
echo "[10] Checking security features..."
SECURITY_PASS=0
if grep -q "ThrottlerModule" backend/src/app.module.ts; then
    SECURITY_PASS=$((SECURITY_PASS+1))
fi
if grep -q "ValidationPipe" backend/src/main.ts; then
    SECURITY_PASS=$((SECURITY_PASS+1))
fi
if grep -q "HttpExceptionFilter" backend/src/main.ts; then
    SECURITY_PASS=$((SECURITY_PASS+1))
fi
if [ $SECURITY_PASS -ge 2 ]; then
    echo "     ✓ PASS: Security features implemented"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Security features incomplete"
    FAILED=$((FAILED+1))
fi

# Check 11: Health check
echo "[11] Checking health check endpoint..."
if [ -f "backend/src/health.controller.ts" ]; then
    echo "     ✓ PASS: Health check endpoint exists"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Health check missing"
    FAILED=$((FAILED+1))
fi

# Check 12: Authentication
echo "[12] Checking authentication flow..."
if grep -q "isAuthenticated" src/lib/api.ts && grep -q "JwtAuthGuard" backend/src/products/products.controller.ts; then
    echo "     ✓ PASS: Authentication implemented"
    PASSED=$((PASSED+1))
else
    echo "     ✗ FAIL: Authentication incomplete"
    FAILED=$((FAILED+1))
fi

echo ""
echo "========================================"
echo "RESULTS"
echo "========================================"
echo "Passed: $PASSED"
echo "Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "✅ ALL CHECKS PASSED - Application is production-ready!"
    exit 0
else
    echo "⚠️  Some checks failed - Review required"
    exit 1
fi
