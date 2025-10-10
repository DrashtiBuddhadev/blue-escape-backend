# Blue Escape Backend

A production-ready NestJS backend application with MySQL integration for managing blogs, collections, and experiences.

## 🚀 Quick Start

### Development
```bash
npm install
npm run start:dev
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production setup instructions.

## ✨ Features

### Core Features
- **Blog Management**: Complete CRUD operations for blog posts with rich content, media, and location-based filtering
- **Collection Management**: Hierarchical collections with detailed content management
- **Experience Management**: Travel experiences with galleries, tags, and location-based search
- **Contact Inquiries**: Handle customer contact forms and inquiries
- **Location Service**: Dynamic continent, country, and city data
- **Tag Management**: Flexible tagging system for content organization

### Production-Ready Features
- ✅ **Security**: Helmet security headers, CORS configuration, rate limiting
- ✅ **Docker**: Multi-stage production builds with optimized images
- ✅ **Automated Backups**: Daily database backups with configurable retention
- ✅ **Health Checks**: Built-in health monitoring endpoints
- ✅ **API Documentation**: Swagger/OpenAPI integration (dev mode)
- ✅ **Authentication**: JWT-based authentication with refresh tokens
- ✅ **Validation**: Comprehensive request/response validation
- ✅ **Environment Configuration**: Secure environment-based configuration
- ✅ **Nginx Support**: Ready for reverse proxy deployment
- ✅ **SSL/TLS**: HTTPS configuration guide included

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

## 📋 Prerequisites

- Node.js 18+ (for development)
- Docker & Docker Compose (recommended for all environments)
- MySQL 8.0+ (handled by Docker)

## 🛠️ Installation

### Option 1: Docker (Recommended)

**Development:**
```bash
# Start all services (app, database, phpmyadmin)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Production:**
```bash
# Setup environment
cp .env.production.example .env
# Edit .env with your production values

# Build and start
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

See [PRODUCTION.md](./PRODUCTION.md) for production setup guide.

### Option 2: Local Development

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Start MySQL (use Docker or local installation)

4. Run the application:
```bash
# Development with hot reload
npm run start:dev

# Production build and run
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Application port (default: 3000)
- `DB_*` - Database connection settings
- `JWT_SECRET` - Secret for JWT token signing
- `ALLOWED_ORIGINS` - CORS allowed origins
- `API_URL` - Public API URL

### Generate Secure Secrets

For production, generate strong secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
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

## 🗄️ Database

The application uses TypeORM with MySQL 8.0.

**Development**: Auto-synchronization enabled (creates/updates tables automatically)  
**Production**: Synchronization disabled for safety

### Backups

Automated backups are included in production setup:
```bash
# View backups
docker exec blue-escape-backup ls -lh /backups

# Manual backup
docker exec blue-escape-backup /scripts/backup-db.sh

# Restore backup
docker exec -it blue-escape-backup /scripts/restore-db.sh backup_file.sql.gz
```

See [scripts/README.md](./scripts/README.md) for detailed backup documentation.

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Comprehensive production deployment guide
- [PRODUCTION.md](./PRODUCTION.md) - Quick production setup reference
- [scripts/README.md](./scripts/README.md) - Database backup documentation
- [DOCKER.md](./DOCKER.md) - Docker setup and usage guide

## 🔒 Security

- Helmet for security headers
- CORS with origin validation
- Rate limiting via Throttler
- JWT authentication
- Environment-based secrets
- Non-root Docker user
- Database not exposed externally in production
- SQL injection protection via TypeORM
- Input validation on all endpoints

## 🚢 Deployment

### Digital Ocean / VPS

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions including:
- Server setup and configuration
- SSL certificate installation
- Nginx reverse proxy setup
- Automated backups configuration
- Monitoring and logging

### Docker Compose Files

- `docker-compose.yml` - Development environment
- `docker-compose.prod.yml` - Production environment
- `docker-compose.nginx.yml` - Optional Nginx container

### Dockerfiles

- `Dockerfile` - Development (hot reload)
- `Dockerfile.prod` - Production (multi-stage build)

## 🏗️ Project Structure

```
src/
├── app.module.ts           # Main application module
├── main.ts                 # Application entry point
├── config/                 # Configuration files
├── entities/               # TypeORM entities
├── modules/                # Feature modules
│   ├── auth/              # Authentication
│   ├── blog/              # Blog management
│   ├── collection/        # Collection management
│   ├── experience/        # Experience management
│   ├── contact/           # Contact inquiries
│   ├── location/          # Location service
│   └── tags/              # Tag management
└── common/                # Shared utilities

scripts/
├── backup-db.sh           # Database backup script
├── restore-db.sh          # Database restore script
└── cron/                  # Cron configurations

nginx/
├── nginx.conf             # Nginx main config
└── conf.d/                # Site configurations
```

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:3000/api/v1/health
```

### Logs
```bash
# Development
docker-compose logs -f

# Production
docker-compose -f docker-compose.prod.yml logs -f app

# Specific service
docker logs blue-escape-app-prod
```

### Container Stats
```bash
docker stats
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For issues or questions:
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Check [PRODUCTION.md](./PRODUCTION.md) for production setup
- Review application logs
- Open an issue on GitHub
