# Blue Escape Backend - Production Deployment Guide

This guide will help you deploy the Blue Escape Backend to Digital Ocean (or any VPS) with proper security, automated backups, and SSL configuration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Environment Configuration](#environment-configuration)
4. [SSL Certificate Setup](#ssl-certificate-setup)
5. [Deployment](#deployment)
6. [Database Backups](#database-backups)
7. [Monitoring & Logs](#monitoring--logs)
8. [Security Checklist](#security-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Digital Ocean Droplet (or any VPS) with Ubuntu 22.04 LTS
- Minimum recommended: 2 GB RAM, 1 vCPU, 50 GB SSD
- Domain name pointed to your server's IP address
- SSH access to your server

## Server Setup

### 1. Initial Server Configuration

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add your user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Git
sudo apt install git -y

# Install Nginx (for reverse proxy)
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Clone Repository

```bash
# Create application directory
mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/your-username/blue-escape-backend.git
cd blue-escape-backend
```

## Environment Configuration

### 1. Create Production Environment File

```bash
# Copy the production example
cp .env.production.example .env

# Edit the environment file
nano .env
```

### 2. Generate Secure Secrets

```bash
# Generate JWT secrets (run on your local machine or server with Node.js)
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Required Environment Variables

Update `.env` with your production values:

```env
# Application
NODE_ENV=production
PORT=3000
API_URL=https://api.yourdomain.com

# Frontend URL (for CORS)
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Database Configuration
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=blue_escape_user
DB_PASSWORD=YOUR_STRONG_PASSWORD_HERE
DB_DATABASE=blue_escape_db
DB_ROOT_PASSWORD=YOUR_ROOT_PASSWORD_HERE

# JWT Configuration
JWT_SECRET=YOUR_GENERATED_SECRET_HERE
JWT_REFRESH_SECRET=YOUR_GENERATED_REFRESH_SECRET_HERE
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM=noreply@blueescape.com

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=20

# Database Backup Configuration
BACKUP_RETENTION_DAYS=30
BACKUP_SCHEDULE=0 2 * * *
```

## SSL Certificate Setup

### 1. Configure Nginx Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/blue-escape-api
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint (no rate limiting)
    location /api/v1/health {
        proxy_pass http://localhost:3000/api/v1/health;
        access_log off;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/blue-escape-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 2. Obtain SSL Certificate

```bash
sudo certbot --nginx -d api.yourdomain.com
```

Follow the prompts. Certbot will automatically configure SSL and set up auto-renewal.

## Deployment

### 1. Build and Start Services

```bash
cd /var/www/blue-escape-backend

# Build the production Docker image
docker-compose -f docker-compose.prod.yml build

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 2. Verify Deployment

```bash
# Check running containers
docker ps

# Test health endpoint
curl https://api.yourdomain.com/api/v1/health

# Check application logs
docker logs blue-escape-app-prod

# Check database logs
docker logs blue-escape-mysql-prod
```

### 3. Setup Auto-start on Boot

Create a systemd service:

```bash
sudo nano /etc/systemd/system/blue-escape.service
```

Add:

```ini
[Unit]
Description=Blue Escape Backend
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/blue-escape-backend
ExecStart=/usr/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/bin/docker-compose -f docker-compose.prod.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Enable the service:

```bash
sudo systemctl enable blue-escape.service
sudo systemctl start blue-escape.service
```

## Database Backups

### 1. Automated Backups

Backups run automatically at 2 AM daily (configured in `BACKUP_SCHEDULE`).

Check backup status:

```bash
# View backup logs
docker logs blue-escape-backup

# List backups
docker exec blue-escape-backup ls -lh /backups

# Check backup size
docker exec blue-escape-backup du -sh /backups
```

### 2. Manual Backup

```bash
# Create manual backup
docker exec blue-escape-backup /scripts/backup-db.sh

# Copy backup to host
docker cp blue-escape-backup:/backups/backup_blue_escape_db_TIMESTAMP.sql.gz ./
```

### 3. Restore from Backup

```bash
# List available backups
docker exec blue-escape-backup ls -lh /backups

# Restore specific backup
docker exec -it blue-escape-backup /scripts/restore-db.sh backup_blue_escape_db_TIMESTAMP.sql.gz
```

### 4. Backup to External Storage

For production, consider backing up to S3 or DigitalOcean Spaces:

```bash
# Install AWS CLI in backup container
docker exec -it blue-escape-backup apt-get update
docker exec -it blue-escape-backup apt-get install awscli -y

# Configure AWS credentials
docker exec -it blue-escape-backup aws configure

# Sync backups to S3
docker exec blue-escape-backup aws s3 sync /backups s3://your-bucket-name/blue-escape-backups/
```

## Monitoring & Logs

### 1. View Application Logs

```bash
# Real-time logs
docker-compose -f docker-compose.prod.yml logs -f app

# Last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100 app

# Database logs
docker-compose -f docker-compose.prod.yml logs mysql
```

### 2. Monitor Resource Usage

```bash
# Container stats
docker stats

# Disk usage
df -h

# Database size
docker exec blue-escape-mysql-prod mysql -uroot -p$DB_ROOT_PASSWORD -e "SELECT table_schema 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) 'Size (MB)' FROM information_schema.tables WHERE table_schema = 'blue_escape_db' GROUP BY table_schema;"
```

### 3. Setup Log Rotation

```bash
sudo nano /etc/logrotate.d/blue-escape
```

Add:

```
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=10M
    missingok
    delaycompress
    copytruncate
}
```

## Security Checklist

### Before Going Live

- [ ] All environment variables set with strong passwords
- [ ] JWT secrets generated with `crypto.randomBytes(64)`
- [ ] Database password changed from default
- [ ] Root database password set and secured
- [ ] CORS configured with actual frontend URLs only
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Swagger disabled (automatic in production mode)
- [ ] Rate limiting configured
- [ ] Nginx reverse proxy configured
- [ ] Firewall configured (UFW):
  ```bash
  sudo ufw allow 22/tcp    # SSH
  sudo ufw allow 80/tcp    # HTTP
  sudo ufw allow 443/tcp   # HTTPS
  sudo ufw enable
  ```
- [ ] SSH key-based authentication enabled
- [ ] Automated backups tested
- [ ] Health check endpoint verified
- [ ] Log monitoring set up
- [ ] Server auto-updates configured

### Regular Maintenance

- Monitor logs weekly
- Check backups weekly
- Update dependencies monthly
- Review security updates
- Test restore procedure quarterly

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check if ports are available
sudo netstat -tulpn | grep LISTEN

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### Database Connection Issues

```bash
# Check MySQL is running
docker exec blue-escape-mysql-prod mysqladmin ping

# Check credentials
docker exec -it blue-escape-mysql-prod mysql -uroot -p

# Check app can reach database
docker exec -it blue-escape-app-prod ping mysql
```

### High Memory Usage

```bash
# Check container stats
docker stats

# Restart containers
docker-compose -f docker-compose.prod.yml restart

# Adjust MySQL buffer pool in docker-compose.prod.yml
# Reduce --innodb_buffer_pool_size if needed
```

### Backup Issues

```bash
# Check backup container logs
docker logs blue-escape-backup

# Manually run backup
docker exec blue-escape-backup /scripts/backup-db.sh

# Check cron is running
docker exec blue-escape-backup crontab -l
```

### SSL Certificate Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# Check certificate expiry
sudo certbot certificates
```

## Updating the Application

### 1. Pull Latest Changes

```bash
cd /var/www/blue-escape-backend
git pull origin main
```

### 2. Rebuild and Restart

```bash
# Stop services
docker-compose -f docker-compose.prod.yml down

# Rebuild
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 3. Zero-Downtime Updates (Advanced)

For zero-downtime updates, use Docker's rolling update feature or set up a blue-green deployment strategy.

## Support

For issues or questions:
- Check application logs: `docker logs blue-escape-app-prod`
- Check database logs: `docker logs blue-escape-mysql-prod`
- Review this documentation
- Check GitHub issues

---

**Last Updated:** January 2025

