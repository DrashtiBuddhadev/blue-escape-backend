-- Add tags column to collection_contents table
ALTER TABLE collection_contents
ADD COLUMN tags JSON NULL AFTER property_name;
