# Production Setup Quick Guide

This is a quick reference for deploying to production. For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Quick Start

### 1. Environment Setup

```bash
# Copy production environment template
cp .env.production.example .env

# Generate secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Edit .env with your values
nano .env
```

### 2. Deploy

```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d --build

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 3. Verify

```bash
# Check health
curl http://localhost:3000/api/v1/health

# Check containers
docker ps
```

## Key Differences from Development

| Feature | Development | Production |
|---------|-------------|------------|
| Dockerfile | `Dockerfile` | `Dockerfile.prod` |
| Docker Compose | `docker-compose.yml` | `docker-compose.prod.yml` |
| Node Environment | `development` | `production` |
| TypeScript | Compiled on-the-fly | Pre-built to `dist/` |
| Source Code | Mounted as volume | Built into image |
| Swagger UI | Enabled | Disabled |
| CORS | Open for localhost | Strict origin checking |
| Security Headers | Minimal | Helmet enabled |
| Rate Limiting | 10 req/min | 20 req/min |
| Database Pool | 10 connections | 20 connections |
| Backups | Manual | Automated daily |
| User | root | non-root (nestjs) |

## Production Files

- `Dockerfile.prod` - Multi-stage production build
- `docker-compose.prod.yml` - Production services
- `.env.production.example` - Production env template
- `scripts/backup-db.sh` - Automated backup script
- `scripts/restore-db.sh` - Database restore script
- `nginx/*` - Nginx reverse proxy configs
- `DEPLOYMENT.md` - Comprehensive deployment guide

## Security Features

✅ Helmet security headers  
✅ Rate limiting (Throttler)  
✅ CORS with origin validation  
✅ JWT with strong secrets  
✅ Non-root Docker user  
✅ Database not exposed externally  
✅ Automated backups  
✅ SSL/TLS via Nginx  
✅ Environment-based configuration  
✅ Swagger disabled in production  

## Environment Variables

See `.env.production.example` for all required variables.

Critical variables to change:
- `JWT_SECRET` - Generate with crypto.randomBytes(64)
- `JWT_REFRESH_SECRET` - Generate with crypto.randomBytes(64)
- `DB_PASSWORD` - Strong unique password
- `DB_ROOT_PASSWORD` - Strong unique password
- `ALLOWED_ORIGINS` - Your actual frontend URLs
- `API_URL` - Your actual API domain

## Database Backups

Automated backups run daily at 2 AM.

```bash
# Check backups
docker exec blue-escape-backup ls -lh /backups

# Manual backup
docker exec blue-escape-backup /scripts/backup-db.sh

# Restore backup
docker exec -it blue-escape-backup /scripts/restore-db.sh backup_file.sql.gz
```

## Monitoring

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Container stats
docker stats

# Check health
curl http://localhost:3000/api/v1/health
```

## Updating

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

## Troubleshooting

### App won't start
```bash
docker-compose -f docker-compose.prod.yml logs app
```

### Database connection failed
```bash
docker-compose -f docker-compose.prod.yml logs mysql
docker exec blue-escape-mysql-prod mysqladmin ping
```

### Check environment variables
```bash
docker exec blue-escape-app-prod env | grep NODE_ENV
```

## Next Steps

1. ✅ Setup server (Ubuntu 22.04)
2. ✅ Configure environment variables
3. ✅ Deploy with docker-compose.prod.yml
4. ⬜ Setup Nginx reverse proxy
5. ⬜ Configure SSL with Let's Encrypt
6. ⬜ Test automated backups
7. ⬜ Setup monitoring/alerting
8. ⬜ Configure firewall (UFW)

For detailed instructions on each step, see [DEPLOYMENT.md](./DEPLOYMENT.md).

