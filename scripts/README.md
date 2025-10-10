# Database Backup Scripts

This directory contains scripts for automated database backups and restoration.

## Files

### `backup-db.sh`
Automated backup script that:
- Creates compressed MySQL dumps
- Adds timestamps to backup files
- Manages retention (deletes old backups)
- Logs all operations

**Usage:**
```bash
# Automated (runs via cron)
# See: scripts/cron/backup-cron

# Manual execution
docker exec blue-escape-backup /scripts/backup-db.sh
```

### `restore-db.sh`
Database restoration script that:
- Restores database from compressed backup
- Validates backup file exists
- Requires confirmation before restoring

**Usage:**
```bash
# List available backups
docker exec blue-escape-backup ls -lh /backups

# Restore from specific backup
docker exec -it blue-escape-backup /scripts/restore-db.sh backup_blue_escape_db_20250109_020000.sql.gz

# Or just provide the filename
docker exec -it blue-escape-backup /scripts/restore-db.sh backup_blue_escape_db_20250109_020000.sql.gz
```

### `cron/backup-cron`
Cron schedule configuration for automated backups.

Default: Daily at 2:00 AM
```
0 2 * * * /scripts/backup-db.sh >> /var/log/cron.log 2>&1
```

## Configuration

Backups are configured via environment variables:

```env
BACKUP_RETENTION_DAYS=7      # How many days to keep backups
BACKUP_SCHEDULE=0 2 * * *     # Cron schedule (daily at 2 AM)
DB_HOST=mysql                 # Database host
DB_USERNAME=blue_escape_user  # Database user
DB_PASSWORD=your_password     # Database password
DB_DATABASE=blue_escape_db    # Database name
```

## Backup Location

Backups are stored in the Docker volume `mysql_backups` which is mounted to `/backups` in the backup container.

To access backups from the host:
```bash
# Copy backup to current directory
docker cp blue-escape-backup:/backups/backup_file.sql.gz ./

# List all backups
docker exec blue-escape-backup ls -lh /backups
```

## Monitoring

Check backup logs:
```bash
# View backup container logs
docker logs blue-escape-backup

# View cron log
docker exec blue-escape-backup cat /var/log/cron.log

# Check last backup
docker exec blue-escape-backup ls -lt /backups | head -n 2
```

## Backup to External Storage

For production, it's recommended to sync backups to external storage (S3, DigitalOcean Spaces, etc.).

Example with AWS S3:
```bash
# Install AWS CLI in backup container
docker exec blue-escape-backup apt-get update
docker exec blue-escape-backup apt-get install -y awscli

# Configure AWS credentials
docker exec -it blue-escape-backup aws configure

# Sync backups to S3
docker exec blue-escape-backup aws s3 sync /backups s3://your-bucket/backups/
```

## Testing Backups

It's crucial to regularly test that backups can be restored:

```bash
# 1. Create a test backup
docker exec blue-escape-backup /scripts/backup-db.sh

# 2. Note the backup file name
docker exec blue-escape-backup ls -lt /backups | head -n 2

# 3. Test restore (on a test database)
docker exec -it blue-escape-backup /scripts/restore-db.sh backup_file.sql.gz

# 4. Verify data integrity
docker exec blue-escape-mysql-prod mysql -uroot -p -e "USE blue_escape_db; SHOW TABLES;"
```

## Troubleshooting

### Backups not running

```bash
# Check if cron is running
docker exec blue-escape-backup ps aux | grep cron

# Check cron configuration
docker exec blue-escape-backup crontab -l

# View cron logs
docker exec blue-escape-backup cat /var/log/cron.log
```

### Permission errors

```bash
# Make script executable
docker exec blue-escape-backup chmod +x /scripts/backup-db.sh
docker exec blue-escape-backup chmod +x /scripts/restore-db.sh
```

### Disk space issues

```bash
# Check backup volume size
docker exec blue-escape-backup df -h /backups

# Reduce retention days
# Edit .env: BACKUP_RETENTION_DAYS=3

# Manual cleanup
docker exec blue-escape-backup find /backups -name "backup_*.sql.gz" -mtime +7 -delete
```

## Best Practices

1. **Test Restores**: Regularly test that backups can be restored
2. **External Storage**: Sync backups to S3/Spaces for disaster recovery
3. **Monitor**: Set up alerts for backup failures
4. **Retention**: Balance between space usage and recovery needs
5. **Encryption**: Consider encrypting backups before uploading to external storage
6. **Automation**: Automate external backup uploads
7. **Documentation**: Document your restore procedures

## Security

- Backups contain sensitive data
- Secure backup storage locations
- Encrypt backups if storing externally
- Restrict access to backup files
- Rotate database credentials periodically

