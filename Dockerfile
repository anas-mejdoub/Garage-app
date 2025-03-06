# Build stage
# Add a build stage for Node.js
FROM node:18 as node-builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Build frontend assets if needed
COPY . .
RUN npm run build

# Now continue with PHP-FPM container
FROM php:8.2-fpm as builder
# Install system dependencies
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip
COPY --from=node-builder /app/public /var/www/html/public
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy the entire application first
COPY . .

# Install dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Generate application key
RUN php artisan key:generate --force

# Production stage
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Set working directory
WORKDIR /var/www/html

# Copy the entire application from builder stage
COPY --from=builder /var/www/html /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Copy PHP-FPM configuration
# COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf

# Copy startup script
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh
RUN sed -i "s|listen = /run/php/php8.2-fpm.sock|listen = 0.0.0.0:9000|g" /usr/local/etc/php-fpm.d/www.conf
# Expose port 9000
# EXPOSE 9000
EXPOSE 8000 5173

RUN apt-get update && apt-get install -y nodejs npm && npm install
# Start PHP-FPM
CMD ["/usr/local/bin/start.sh"]