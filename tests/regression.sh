#!/bin/bash

# DataCrawl Regression Testing Script
# Ensures that all core functionalities are working as expected.

echo "🚀 Starting DataCrawl Regression Suite..."
echo "----------------------------------------"

# 1. Frontend Unit & Snapshot Tests
echo "📦 Running Frontend Component Tests (Vitest)..."
npm run test
if [ $? -ne 0 ]; then
    echo "❌ Frontend tests failed!"
    exit 1
fi
echo "✅ Frontend tests passed."
echo ""

# 2. Backend Integration Tests (Core Features)
echo "🛡️ Running Backend Core Regression Tests (PHPUnit)..."
php artisan test tests/Feature/CoreRegressionTest.php
if [ $? -ne 0 ]; then
    echo "❌ Backend core tests failed!"
    exit 1
fi
echo "✅ Backend core tests passed."
echo ""

# 3. Code Style & Linting (Optional but recommended for regression)
echo "💅 Checking Code Style..."
# Add linting commands here if available (e.g., ./vendor/bin/pint --test)
echo "⏭️ Skipping code style check (not configured)."
echo ""

echo "----------------------------------------"
echo "🎉 Regression Suite Completed Successfully!"
