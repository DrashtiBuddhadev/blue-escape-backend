FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start in development watch mode (compiles on the fly)
CMD ["npm", "run", "start:dev"]