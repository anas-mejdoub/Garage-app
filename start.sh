#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Generate key if not exists
if ! grep -q "APP_KEY=" .env; then
    php artisan key:generate
fi

# Run migrations if needed
php artisan migrate --force

# Start Apache
apache2-ctl -D FOREGROUND