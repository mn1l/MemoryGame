FROM php:8.1-alpine

# Install composer
RUN apk add --no-cache curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV COMPOSER_ALLOW_SUPERUSER 1

# Create volume for the database
VOLUME [ "/usr/src/memory-backend/var" ]

# Copy the application
COPY . /usr/src/memory-backend
WORKDIR /usr/src/memory-backend

# Install dependencies
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install

# Create the database (shouldn't really be used in production environments)
WORKDIR /usr/src/memory-backend
RUN ["php", "bin/console", "doctrine:schema:update", "--force"]

# Run the application
WORKDIR /usr/src/memory-backend/public
CMD ["php", "-S", "0.0.0.0:8000"]

EXPOSE 8000
