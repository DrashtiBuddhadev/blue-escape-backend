-- Add property_name column to collection_contents table
ALTER TABLE collection_contents
ADD COLUMN property_name VARCHAR(255) NULL AFTER city;

-- Update existing data with property names
-- Amankora collection (Bhutan locations)
UPDATE collection_contents
SET property_name = 'Amankora'
WHERE city LIKE '%Paro%'
   OR city LIKE '%Thimphu%'
   OR city LIKE '%Punakha%'
   OR city LIKE '%Gangtey%'
   OR city LIKE '%Bumthang%';

-- Six Senses collection (Jaipur, India)
UPDATE collection_contents
SET property_name = 'Fort Barwara'
WHERE city = 'Jaipur' AND country = 'India';
