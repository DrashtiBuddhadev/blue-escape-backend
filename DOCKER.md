# Docker Setup Guide for Blue Escape Backend

This guide explains how to run the Blue Escape Backend using Docker and Docker Compose.

## Prerequisites

- Docker Engine (v20.10+)
- Docker Compose (v2.0+)

## Quick Start

### 1. Start the Complete Stack (Development)

```bash
# Start MySQL database and NestJS app in development mode
npm run docker:up

# Or run in detached mode (background)
npm run docker:up:detached
```

### 2. View Logs

```bash
# View logs from all services
npm run docker:logs

# View logs from specific service
docker-compose logs -f app
docker-compose logs -f mysql
```

### 3. Stop Services

```bash
# Stop all services
npm run docker:down

# Stop and remove volumes (cleans database)
npm run docker:clean
```

## Available Docker Commands

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build Docker images |
| `npm run docker:up` | Start all services |
| `npm run docker:up:detached` | Start services in background |
| `npm run docker:down` | Stop all services |
| `npm run docker:logs` | View logs from all services |
| `npm run docker:dev` | Start with development overrides |
| `npm run docker:prod` | Start production version |
| `npm run docker:db` | Start only MySQL database |
| `npm run docker:clean` | Stop and clean all data |
| `npm run docker:rebuild` | Rebuild and restart everything |
| `npm run docker:phpmyadmin` | Start phpMyAdmin for database management |

## Services

### MySQL Database
- **Port**: 3306
- **Database**: blue_escape_db
- **Username**: blue_escape_user
- **Password**: blue_escape_password
- **Root Password**: root_password

### NestJS Application
- **Port**: 3000 (development)
- **Port**: 3001 (production)
- **Health Check**: http://localhost:3000/health

### phpMyAdmin (Optional)
- **Port**: 8080
- **URL**: http://localhost:8080
- **Username**: blue_escape_user
- **Password**: blue_escape_password

## Environment Configurations

### Development Mode
Uses `docker-compose.yml` + `docker-compose.override.yml`
- Hot reload enabled
- Debug port exposed (9229)
- Source code mounted as volume
- General query logging enabled

### Production Mode
Uses production profile
- Optimized build
- No source code mounting
- Minimal container footprint

## Database Initialization

The MySQL database is automatically initialized with:
- Complete schema for blogs, collections, and experiences
- Sample data for testing
- Proper indexes for performance
- User creation with appropriate permissions

**Initial Schema includes:**
- `blogs` table with JSON content support
- `collections` and `collection_contents` tables with relationships
- `experiences` table with rich media support
- Sample blog posts, collections, and experiences

## Volumes

- `mysql_data`: Persistent MySQL data storage
- Application source code (development only)

## Networks

All services run on the `blue-escape-network` bridge network, allowing inter-service communication.

## Health Checks

Both MySQL and the NestJS application have health checks:
- **MySQL**: `mysqladmin ping`
- **NestJS**: HTTP GET to `/health` endpoint

## Troubleshooting

### Port Conflicts
If ports 3000, 3306, or 8080 are in use:
```bash
# Check what's using the ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :3306
netstat -tulpn | grep :8080

# Stop conflicting services or change ports in docker-compose.yml
```

### Database Connection Issues
```bash
# Check MySQL container logs
docker-compose logs mysql

# Verify MySQL is healthy
docker-compose ps

# Connect to MySQL directly
docker-compose exec mysql mysql -u blue_escape_user -p blue_escape_db
```

### Application Startup Issues
```bash
# Check application logs
docker-compose logs app

# Rebuild application image
npm run docker:rebuild

# Connect to application container
docker-compose exec app sh
```

### Reset Everything
```bash
# Complete reset (removes all data)
npm run docker:clean
docker system prune -f
npm run docker:up
```

## Development Workflow

1. **Start development environment:**
   ```bash
   npm run docker:dev
   ```

2. **Make code changes** - they will be automatically reflected due to volume mounting

3. **View logs** to debug:
   ```bash
   npm run docker:logs
   ```

4. **Access database** via phpMyAdmin:
   ```bash
   npm run docker:phpmyadmin
   # Then open http://localhost:8080
   ```

5. **Test API endpoints:**
   ```bash
   curl http://localhost:3000/health
   curl http://localhost:3000/blogs
   curl http://localhost:3000/collections
   curl http://localhost:3000/experiences
   ```

## Production Deployment

For production deployment:

1. **Update environment variables** in `.env.docker`
2. **Use production profile:**
   ```bash
   npm run docker:prod
   ```
3. **Consider using external database** for better performance
4. **Set up reverse proxy** (nginx) for SSL and load balancing
5. **Configure backup strategy** for MySQL data

## API Testing with Sample Data

After starting the services, you can test with the pre-loaded sample data:

```bash
# Get all blogs
curl http://localhost:3000/blogs

# Get blogs by region
curl http://localhost:3000/blogs?region=Asia

# Get a specific blog by slug
curl http://localhost:3000/blogs/slug/discovering-hidden-gems-bali

# Get all collections
curl http://localhost:3000/collections

# Get collection contents
curl http://localhost:3000/collections/content/all

# Get all experiences
curl http://localhost:3000/experiences

# Get experiences by country
curl http://localhost:3000/experiences?country=Maldives
```