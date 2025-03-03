#!/bin/bash

# Exit on error
set -e

# Check if .env file exists
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Generate key if not exists
if ! grep -q "APP_KEY=base64:" .env; then
    php artisan key:generate --force
fi

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! php artisan migrate:status > /dev/null 2>&1; do
    sleep 1
done
echo "Database is ready!"

# Run migrations if needed
php artisan migrate --force

# Start PHP-FPM
exec php-fpm -F
