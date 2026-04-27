#!/bin/bash
# configure-codespaces.sh

# Detect Codespaces
if [ "$CODESPACES" != "true" ]; then
  echo "Not in Codespaces. Using localhost defaults."
  exit 0
fi

# Export dynamic URLs for child processes
export BACKEND_PORT=3001
export FRONTEND_PORT=3000
export FRONTEND_URL="https://${CODESPACE_NAME}-${FRONTEND_PORT}.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
export BACKEND_URL="https://${CODESPACE_NAME}-${BACKEND_PORT}.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"

# Write .env.local dynamically for Next.js frontend
cat > .env.local <<EOF
# API Backend URL - points to backend on port 3001
NEXT_PUBLIC_API_URL=${BACKEND_URL}/api

# Stripe Publishable Key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder

# App URL
NEXT_PUBLIC_APP_URL=${FRONTEND_URL}
EOF

# Write backend .env to accept all origins in Codespaces
cat > backend/.env <<EOF
# MongoDB
MONGODB_URI=mongodb+srv://tripleonesoft_db_user:y4Z2Cy1a7fcrrGT8@cluster0.1pqxk7t.mongodb.net/apex-precision?retryWrites=true&w=majority

# Use in-memory MongoDB for development (when local MongoDB is not available)
USE_IN_MEMORY_MONGODB=false

# Backend server host - bind to 0.0.0.0 for external access
HOST=0.0.0.0
PORT=3001

# CORS origins - allow Codespaces URLs
CORS_ORIGINS=${FRONTEND_URL},http://localhost:3000
EOF

# Make ports public using gh CLI if available
if command -v gh &> /dev/null; then
  gh codespace ports visibility ${BACKEND_PORT}:public -c ${CODESPACE_NAME} 2>/dev/null
  gh codespace ports visibility ${FRONTEND_PORT}:public -c ${CODESPACE_NAME} 2>/dev/null
fi

echo "Codespaces environment configured:"
echo "  Frontend URL: ${FRONTEND_URL}"
echo "  Backend URL: ${BACKEND_URL}"
echo ""
echo "Start apps with:"
echo "  (backend) cd backend && npm run start:prod"
echo "  (frontend) npm run start:frontend"
