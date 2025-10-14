# Blue Escape Backend - Hostinger VPS Deployment Guide

**Complete Ubuntu deployment guide for beginners**

This guide will walk you through deploying your Blue Escape Backend on Hostinger VPS (Ubuntu 25.04) using Docker. All your seeded data will be preserved.

---

## Server Information

- **IP Address**: 72.60.206.231
- **OS**: Ubuntu 25.04
- **Resources**: 1 vCPU, 4GB RAM
- **SSH Access**: `ssh root@72.60.206.231`

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Connect to VPS](#step-1-connect-to-vps)
3. [Step 2: Install Required Software](#step-2-install-required-software)
4. [Step 3: Clone Repository](#step-3-clone-repository)
5. [Step 4: Configure Environment](#step-4-configure-environment)
6. [Step 5: Deploy Application](#step-5-deploy-application)
7. [Step 6: Setup Domain & SSL (Optional)](#step-6-setup-domain--ssl-optional)
8. [Step 7: Configure Firewall](#step-7-configure-firewall)
9. [Step 8: Enable Auto-Start](#step-8-enable-auto-start)
10. [Managing Your Application](#managing-your-application)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Your Hostinger VPS root password
- (Optional) A domain name pointed to your VPS IP (72.60.206.231)
- SSH client (Windows: PuTTY or built-in terminal, Mac/Linux: terminal)

---

## Step 1: Connect to VPS

### Using Windows Terminal or PowerShell

```bash
ssh root@72.60.206.231
```

### Using PuTTY (Windows)

1. Open PuTTY
2. Host Name: `72.60.206.231`
3. Port: `22`
4. Click "Open"
5. Login as: `root`
6. Enter your password

---

## Step 2: Install Required Software

### 2.1 Update System

Copy and paste each command one at a time:

```bash
# Update package list
apt update

# Upgrade installed packages
apt upgrade -y
```

### 2.2 Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

**Verify Docker installation:**

```bash
docker --version
# Should show: Docker version 27.x.x or similar
```

### 2.3 Install Docker Compose

```bash
# Download Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
chmod +x /usr/local/bin/docker-compose
```

**Verify Docker Compose installation:**

```bash
docker-compose --version
# Should show: Docker Compose version v2.x.x or similar
```

### 2.4 Install Git

```bash
apt install git -y
```

**Verify Git installation:**

```bash
git --version
# Should show: git version 2.x.x
```

---

## Step 3: Clone Repository

### 3.1 Create Application Directory

```bash
# Create directory for the app
mkdir -p /var/www

# Navigate to it
cd /var/www
```

### 3.2 Clone Your Repository

**If repository is public:**

```bash
git clone https://github.com/YOUR_USERNAME/blue-escape-backend.git
cd blue-escape-backend
```

**If repository is private:**

You'll need to authenticate. Use one of these methods:

**Method 1: HTTPS with Personal Access Token**

```bash
git clone https://YOUR_TOKEN@github.com/YOUR_USERNAME/blue-escape-backend.git
cd blue-escape-backend
```

**Method 2: SSH (Recommended for private repos)**

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter for all prompts to use defaults

# Display your public key
cat ~/.ssh/id_ed25519.pub

# Copy the output and add it to GitHub:
# GitHub ’ Settings ’ SSH and GPG keys ’ New SSH key

# Then clone
git clone git@github.com:YOUR_USERNAME/blue-escape-backend.git
cd blue-escape-backend
```

---

## Step 4: Configure Environment

### 4.1 Create Production Environment File

```bash
# Copy the example file
cp .env.production.example .env
```

### 4.2 Edit Environment Variables

```bash
# Edit .env file
nano .env
```

**Update these values:**

```env
# Change this to your domain or VPS IP
API_URL=http://72.60.206.231:3000

# Add your frontend domains (replace with actual domains)
ALLOWED_ORIGINS=http://72.60.206.231:3001,https://yourdomain.com

# Database credentials are already set:
# DB_USERNAME=blue_escape_user
# DB_PASSWORD=kartikblueescape939
# DB_ROOT_PASSWORD=kartikblueescape939

# All other values are already configured
```

**Save and exit nano:**
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

### 4.3 Verify .env File

```bash
cat .env
# Check that all values are correct
```

---

## Step 5: Deploy Application

### 5.1 Build and Start Docker Containers

```bash
# Build the production Docker image
docker-compose -f docker-compose.prod.yml build

# Start all services (MySQL + App + Backup)
docker-compose -f docker-compose.prod.yml up -d
```

**What this does:**
- `-d` runs containers in background (detached mode)
- Creates MySQL database
- Builds and starts your NestJS application
- Sets up automated database backups

### 5.2 Check Container Status

```bash
docker ps
```

**You should see 3 containers running:**
- `blue-escape-mysql-prod`
- `blue-escape-app-prod`
- `blue-escape-backup`

### 5.3 View Logs

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs

# Follow app logs in real-time
docker-compose -f docker-compose.prod.yml logs -f app

# Press Ctrl+C to exit logs
```

### 5.4 Test the Application

```bash
# Test health endpoint
curl http://localhost:3000/api/v1/health

# Should return: {"status":"ok","timestamp":"..."}
```

**Test from your browser:**
Open: `http://72.60.206.231:3000/api/v1/health`

---

## Step 6: Setup Domain & SSL (Optional)

If you have a domain name (e.g., `api.blueescape.in`), follow these steps:

### 6.1 Point Domain to VPS

In your domain registrar (Hostinger, GoDaddy, etc.):

1. Add an **A record**:
   - Name: `api` (or `@` for root domain)
   - Value: `72.60.206.231`
   - TTL: 3600

2. Wait 5-10 minutes for DNS propagation

### 6.2 Install Nginx

```bash
apt install nginx -y
```

### 6.3 Configure Nginx Reverse Proxy

```bash
# Create Nginx config
nano /etc/nginx/sites-available/blue-escape-api
```

**Paste this configuration:**

```nginx
server {
    listen 80;
    server_name api.blueescape.in;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

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

**Save and exit:** `Ctrl + X`, then `Y`, then `Enter`

### 6.4 Enable Site

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/blue-escape-api /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

### 6.5 Install SSL Certificate (Free with Let's Encrypt)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
certbot --nginx -d api.blueescape.in

# Follow the prompts:
# 1. Enter your email
# 2. Agree to terms (Y)
# 3. Choose to redirect HTTP to HTTPS (option 2)
```

**Your API is now accessible at:** `https://api.blueescape.in`

### 6.6 Update .env with Domain

```bash
nano .env
```

Change:
```env
API_URL=https://api.blueescape.in
ALLOWED_ORIGINS=https://blueescape.in,https://www.blueescape.in
```

**Restart containers to apply changes:**

```bash
docker-compose -f docker-compose.prod.yml restart
```

---

## Step 7: Configure Firewall

### 7.1 Setup UFW (Uncomplicated Firewall)

```bash
# Allow SSH (IMPORTANT: Do this first!)
ufw allow 22/tcp

# Allow HTTP
ufw allow 80/tcp

# Allow HTTPS
ufw allow 443/tcp

# If NOT using Nginx, allow app port
ufw allow 3000/tcp

# Enable firewall
ufw enable

# Check status
ufw status
```

---

## Step 8: Enable Auto-Start

### 8.1 Enable Docker to Start on Boot

```bash
systemctl enable docker
```

### 8.2 Create Systemd Service for Application

```bash
nano /etc/systemd/system/blue-escape.service
```

**Paste this:**

```ini
[Unit]
Description=Blue Escape Backend
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/blue-escape-backend
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

**Save and exit:** `Ctrl + X`, then `Y`, then `Enter`

### 8.3 Enable Service

```bash
# Reload systemd
systemctl daemon-reload

# Enable service to start on boot
systemctl enable blue-escape.service

# Start service now
systemctl start blue-escape.service

# Check status
systemctl status blue-escape.service
```

---

## Managing Your Application

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs

# App only
docker-compose -f docker-compose.prod.yml logs app

# Follow logs in real-time
docker-compose -f docker-compose.prod.yml logs -f app

# Last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100 app
```

### Restart Application

```bash
cd /var/www/blue-escape-backend
docker-compose -f docker-compose.prod.yml restart
```

### Stop Application

```bash
docker-compose -f docker-compose.prod.yml stop
```

### Start Application

```bash
docker-compose -f docker-compose.prod.yml start
```

### Update Application (Pull New Changes)

```bash
cd /var/www/blue-escape-backend

# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Database Backups

**Backups run automatically every day at 2 AM.**

**View backup logs:**

```bash
docker logs blue-escape-backup
```

**List all backups:**

```bash
docker exec blue-escape-backup ls -lh /backups
```

**Create manual backup:**

```bash
docker exec blue-escape-backup /scripts/backup-db.sh
```

**Download backup to local machine:**

```bash
# From your local machine, run:
scp root@72.60.206.231:/var/lib/docker/volumes/blue-escape-backend_mysql_backups/_data/backup_*.sql.gz ./
```

**Restore from backup:**

```bash
# List backups
docker exec blue-escape-backup ls -lh /backups

# Restore specific backup (replace TIMESTAMP)
docker exec -it blue-escape-backup /scripts/restore-db.sh backup_blue_escape_db_TIMESTAMP.sql.gz
```

### Monitor Resource Usage

```bash
# Container stats (CPU, Memory)
docker stats

# Disk usage
df -h

# Check database size
docker exec blue-escape-mysql-prod mysql -uroot -pkartikblueescape939 -e "SELECT table_schema 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) 'Size (MB)' FROM information_schema.tables WHERE table_schema = 'blue_escape_db' GROUP BY table_schema;"
```

---

## Troubleshooting

### Containers Not Starting

```bash
# Check logs for errors
docker-compose -f docker-compose.prod.yml logs

# Check container status
docker ps -a

# Restart containers
docker-compose -f docker-compose.prod.yml restart
```

### Database Connection Failed

```bash
# Check MySQL is running
docker ps | grep mysql

# Check MySQL logs
docker logs blue-escape-mysql-prod

# Test MySQL connection
docker exec -it blue-escape-mysql-prod mysql -uroot -pkartikblueescape939

# If connected, type:
SHOW DATABASES;
EXIT;
```

### Application Not Accessible

```bash
# Check if app is running
docker ps | grep app

# Check app logs
docker logs blue-escape-app-prod

# Test locally on server
curl http://localhost:3000/api/v1/health

# Check firewall
ufw status

# If using Nginx, check Nginx
systemctl status nginx
nginx -t
```

### Port Already in Use

```bash
# Find what's using port 3000
lsof -i :3000

# Or
netstat -tulpn | grep :3000

# Stop the process or change port in .env
```

### Out of Disk Space

```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a

# Remove old backups (older than 7 days)
docker exec blue-escape-backup find /backups -name "*.sql.gz" -mtime +7 -delete
```

### Reset Everything (Nuclear Option)

```bash
cd /var/www/blue-escape-backend

# Stop and remove everything
docker-compose -f docker-compose.prod.yml down -v

# Remove all images
docker system prune -a

# Start fresh
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

---

## Security Best Practices

1. **Change default SSH port** (optional but recommended):
   ```bash
   nano /etc/ssh/sshd_config
   # Change Port 22 to Port 2222
   systemctl restart sshd
   ufw allow 2222/tcp
   ```

2. **Disable root login** (create sudo user first):
   ```bash
   adduser yourusername
   usermod -aG sudo yourusername
   nano /etc/ssh/sshd_config
   # Set PermitRootLogin no
   systemctl restart sshd
   ```

3. **Keep system updated**:
   ```bash
   apt update && apt upgrade -y
   ```

4. **Monitor logs regularly**:
   ```bash
   docker-compose -f docker-compose.prod.yml logs --tail=100
   ```

---

## Quick Reference Commands

```bash
# Navigate to project
cd /var/www/blue-escape-backend

# View logs
docker-compose -f docker-compose.prod.yml logs -f app

# Restart app
docker-compose -f docker-compose.prod.yml restart

# Check status
docker ps

# Update application
git pull && docker-compose -f docker-compose.prod.yml up -d --build

# Create backup
docker exec blue-escape-backup /scripts/backup-db.sh

# Check health
curl http://localhost:3000/api/v1/health
```

---

## Need Help?

If you encounter any issues:

1. Check the logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verify all containers are running: `docker ps`
3. Check the [Troubleshooting](#troubleshooting) section above
4. Review GitHub repository issues

---

**Last Updated:** October 2025
**VPS Provider:** Hostinger
**OS:** Ubuntu 25.04
