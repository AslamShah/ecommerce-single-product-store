#!/bin/bash
cd /workspaces/ecommerce-single-product-store

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    nohup sudo mongod --dbpath /data/db --bind_ip_all --port 27017 > /tmp/mongod.log 2>&1 &
    sleep 3
fi

# Start backend
echo "Starting backend..."
cd backend
nohup npm run start:prod > /tmp/backend.log 2>&1 &
cd ..

# Wait for backend
sleep 5

# Start frontend
echo "Starting frontend..."
nohup npm run start > /tmp/frontend.log 2>&1 &

sleep 5
echo "=== Status ==="
echo "MongoDB: $(pgrep -c mongod || echo 0) processes"
echo "Backend: $(pgrep -c 'node.*dist/main' || echo 0) processes"
echo "Frontend: $(pgrep -c 'node.*next' || echo 0) processes"

echo ""
echo "=== Health Check ==="
curl -s http://localhost:3001/api/health
echo ""
echo "=== Frontend Check ==="
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000