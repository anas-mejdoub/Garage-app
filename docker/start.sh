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
# while ! php artisan migrate:status > /dev/null 2>&1; do
#     sleep 1
# done
sleep 20
echo "Database is ready!"

# Run migrations if needed
php artisan migrate --force

# apt-get update && apt-get install -y nodejs npm
# Start PHP-FPM
npm run dev -- --host &

php artisan serve --host=0.0.0.0 --port=8000 

# npx update-browserslist-db@latest
# exec php-fpm -F