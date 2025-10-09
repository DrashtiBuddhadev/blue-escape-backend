-- Migration script to rename excerpt column to taglines and convert to JSON array

-- Step 1: Add new taglines column with JSON type
ALTER TABLE experiences
ADD COLUMN taglines JSON NULL AFTER featured_media;

-- Step 2: Migrate existing excerpt data to taglines as JSON arrays
UPDATE experiences
SET taglines = CASE
    WHEN excerpt IS NOT NULL AND excerpt != '' THEN JSON_ARRAY(excerpt)
    ELSE NULL
END;

-- Step 3: Drop the old excerpt column
ALTER TABLE experiences
DROP COLUMN excerpt;
