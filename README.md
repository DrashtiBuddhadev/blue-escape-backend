# Blue Escape Backend

A NestJS backend application with MySQL integration for managing blogs, collections, and experiences.

## Features

- **Blog Management**: Complete CRUD operations for blog posts with rich content, media, and location-based filtering
- **Collection Management**: Hierarchical collections with detailed content management
- **Experience Management**: Travel experiences with galleries, tags, and location-based search
- **MySQL Integration**: TypeORM with MySQL database support
- **Validation**: Request validation using class-validator
- **Environment Configuration**: Configurable database and application settings

## Database Schema

### Blog
- UUID-based primary keys
- Rich content with JSON support
- Location-based categorization (region, country, city)
- Author information and publishing workflow
- Tag-based organization

### Collection & CollectionContent
- Two-tier collection system
- Rich media and feature content
- Location-based destination information

### Experience
- Travel experience management
- Media galleries and carousel support
- Time-based recommendations
- Tag-based categorization

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.example` to `.env` and update the database configuration:
```bash
cp .env.example .env
```

3. Set up your MySQL database with the credentials specified in `.env`

## Running the application

```bash
# Development
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

## API Endpoints

### Blogs
- `GET /blogs` - Get all blogs (supports ?region= and ?country= filters)
- `GET /blogs/:id` - Get blog by ID
- `GET /blogs/slug/:slug` - Get blog by slug
- `POST /blogs` - Create new blog
- `PATCH /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Soft delete blog

### Collections
- `GET /collections` - Get all collections
- `GET /collections/:id` - Get collection by ID
- `POST /collections` - Create new collection
- `PATCH /collections/:id` - Update collection
- `DELETE /collections/:id` - Delete collection

### Collection Content
- `GET /collections/content/all` - Get all collection contents
- `GET /collections/:id/content` - Get content for specific collection
- `POST /collections/content` - Create new collection content
- `PATCH /collections/content/:id` - Update collection content
- `DELETE /collections/content/:id` - Soft delete collection content

### Experiences
- `GET /experiences` - Get all experiences (supports ?region=, ?country=, ?city=, ?tag= filters)
- `GET /experiences/:id` - Get experience by ID
- `POST /experiences` - Create new experience
- `PATCH /experiences/:id` - Update experience
- `DELETE /experiences/:id` - Delete experience

## Environment Variables

```bash
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=blue_escape_db

# Application Configuration
JWT_SECRET=your_jwt_secret_here
```

## Development

```bash
# Watch mode
npm run start:dev

# Format code
npm run format

# Lint code
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:cov
```

## Database

The application uses TypeORM with MySQL. Database synchronization is enabled in development mode, which automatically creates/updates tables based on entity definitions.

For production, consider using migrations instead of synchronization.
