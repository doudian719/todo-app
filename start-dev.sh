#!/bin/bash

echo "Starting Todo App Development Environment..."
echo

echo "Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "Frontend build failed!"
    exit 1
fi

echo
echo "Starting backend server..."
echo "Frontend will be available at http://localhost:8080"
echo
go run .
