#!/bin/bash

# Database Restore Script
# This script restores a MySQL database from a backup file

set -e

# Configuration
DB_HOST="${DB_HOST:-mysql}"
DB_USER="root"
DB_PASSWORD="${DB_ROOT_PASSWORD:-root_password}"
DB_NAME="${DB_DATABASE:-blue_escape_db}"
BACKUP_DIR="/backups"

# Check if backup file is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file>"
    echo ""
    echo "Available backups:"
    ls -lh "${BACKUP_DIR}"/backup_*.sql.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "${BACKUP_FILE}" ]; then
    # Try with backup directory prefix
    BACKUP_FILE="${BACKUP_DIR}/${1}"
    if [ ! -f "${BACKUP_FILE}" ]; then
        echo "ERROR: Backup file not found: $1"
        echo ""
        echo "Available backups:"
        ls -lh "${BACKUP_DIR}"/backup_*.sql.gz 2>/dev/null || echo "No backups found"
        exit 1
    fi
fi

echo "========================================="
echo "Database Restore Process"
echo "========================================="
echo "Database: ${DB_NAME}"
echo "Host: ${DB_HOST}"
echo "Backup file: ${BACKUP_FILE}"
echo "========================================="
echo ""
read -p "This will REPLACE the current database. Are you sure? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Restore cancelled"
    exit 0
fi

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
until mysqladmin ping -h"${DB_HOST}" -u"${DB_USER}" -p"${DB_PASSWORD}" --silent; do
    echo "MySQL is unavailable - sleeping"
    sleep 5
done

echo "MySQL is ready - starting restore"

# Restore backup
echo "Restoring database from ${BACKUP_FILE}..."
if gunzip < "${BACKUP_FILE}" | mysql -h"${DB_HOST}" -u"${DB_USER}" -p"${DB_PASSWORD}"; then
    echo "Database restored successfully!"
else
    echo "ERROR: Restore failed!"
    exit 1
fi

echo "========================================="
echo "Restore completed successfully"
echo "========================================="

exit 0

