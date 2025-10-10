#!/bin/bash

# Database Backup Script
# This script creates compressed backups of the MySQL database
# and manages retention by deleting old backups

set -e

# Configuration
DB_HOST="${DB_HOST:-mysql}"
DB_USER="${DB_USERNAME:-blue_escape_user}"
DB_PASSWORD="${DB_PASSWORD}"
DB_NAME="${DB_DATABASE:-blue_escape_db}"
DB_ROOT_PASSWORD="${DB_ROOT_PASSWORD:-root_password}"
BACKUP_DIR="/backups"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/backup_${DB_NAME}_${TIMESTAMP}.sql.gz"
LOG_FILE="${BACKUP_DIR}/backup.log"

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

# Log function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "${LOG_FILE}"
}

log "========================================="
log "Starting database backup process"
log "Database: ${DB_NAME}"
log "Host: ${DB_HOST}"
log "========================================="

# Wait for MySQL to be ready
log "Waiting for MySQL to be ready..."
until mysqladmin ping -h"${DB_HOST}" -uroot -p"${DB_ROOT_PASSWORD}" --silent; do
    log "MySQL is unavailable - sleeping"
    sleep 5
done

log "MySQL is ready - starting backup"

# Create backup
log "Creating backup: ${BACKUP_FILE}"
if mysqldump -h"${DB_HOST}" -uroot -p"${DB_ROOT_PASSWORD}" \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    --databases "${DB_NAME}" | gzip > "${BACKUP_FILE}"; then
    
    BACKUP_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
    log "Backup created successfully: ${BACKUP_FILE} (${BACKUP_SIZE})"
else
    log "ERROR: Backup failed!"
    exit 1
fi

# Cleanup old backups
log "Cleaning up backups older than ${RETENTION_DAYS} days..."
DELETED_COUNT=$(find "${BACKUP_DIR}" -name "backup_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -delete -print | wc -l)
log "Deleted ${DELETED_COUNT} old backup(s)"

# List current backups
BACKUP_COUNT=$(find "${BACKUP_DIR}" -name "backup_*.sql.gz" -type f | wc -l)
TOTAL_SIZE=$(du -sh "${BACKUP_DIR}" | cut -f1)
log "Current backups: ${BACKUP_COUNT} files, Total size: ${TOTAL_SIZE}"

log "Backup process completed successfully"
log "========================================="

exit 0

