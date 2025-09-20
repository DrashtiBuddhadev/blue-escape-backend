-- Blue Escape Database Initialization Script
-- This script creates the database schema for the Blue Escape backend application

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS blue_escape_db;
USE blue_escape_db;

-- Grant permissions for blue_escape_user from any host
GRANT ALL PRIVILEGES ON blue_escape_db.* TO 'blue_escape_user'@'%';
FLUSH PRIVILEGES;

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    featured_media VARCHAR(500) NULL,
    hero_media VARCHAR(500) NULL,
    tags JSON NULL,
    excerpt TEXT NULL,
    content JSON NOT NULL,
    region VARCHAR(100) NULL,
    country VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    author_name VARCHAR(255) NULL,
    about_author TEXT NULL,
    read_time VARCHAR(16) NULL,
    active BOOLEAN DEFAULT TRUE,
    published_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes for performance
    INDEX idx_blogs_active (active),
    INDEX idx_blogs_region (region),
    INDEX idx_blogs_country (country),
    INDEX idx_blogs_city (city),
    INDEX idx_blogs_updated_at (updated_at)
);

-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_collections_updated_at (updated_at)
);

-- Create collection_contents table
CREATE TABLE IF NOT EXISTS collection_contents (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    collection_id CHAR(36) NOT NULL,
    hero_media VARCHAR(500) NULL,
    about_collection TEXT NULL,
    features JSON NULL,
    about_destination JSON NULL,
    region VARCHAR(100) NULL,
    country VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign key constraint
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,

    -- Indexes
    INDEX idx_collection_contents_collection_id (collection_id),
    INDEX idx_collection_contents_active (active),
    INDEX idx_collection_contents_region (region),
    INDEX idx_collection_contents_country (country),
    INDEX idx_collection_contents_city (city),
    INDEX idx_collection_contents_updated_at (updated_at)
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    featured_media VARCHAR(500) NULL,
    excerpt TEXT NULL,
    country VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    region VARCHAR(100) NULL,
    best_time JSON NULL,
    carousel_media TEXT NULL,
    brief_description TEXT NULL,
    content JSON NULL,
    tags JSON NULL,
    gallery JSON NULL,
    story TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_experiences_region (region),
    INDEX idx_experiences_country (country),
    INDEX idx_experiences_city (city),
    INDEX idx_experiences_updated_at (updated_at)
);