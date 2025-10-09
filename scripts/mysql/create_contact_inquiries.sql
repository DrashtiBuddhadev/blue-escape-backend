-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `country_code` VARCHAR(10) NOT NULL DEFAULT '+91',
  `destination` VARCHAR(255) NOT NULL,
  `travel_dates` JSON NOT NULL,
  `travelers` VARCHAR(100) NOT NULL,
  `budget_range` JSON NOT NULL,
  `special_requests` TEXT,
  `inquiry_type` VARCHAR(100) NOT NULL,
  `newsletter` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_inquiry_type` (`inquiry_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
