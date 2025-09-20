# Multi-stage Dockerfile for NestJS Blue Escape Backend

# Development Stage
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "start"]