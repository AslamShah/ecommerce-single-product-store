#!/bin/bash
cd "$(dirname "$0")"

echo "Starting backend server..."
npm run start:prod > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to be ready
for i in {1..30}; do
  if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "Backend ready!"
    break
  fi
  sleep 1
done

echo "Testing..."
curl -s http://localhost:3001/api/health
echo ""
curl -s "http://localhost:3000/api/proxy?path=products"