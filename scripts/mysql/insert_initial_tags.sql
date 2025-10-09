-- Insert initial predefined tags for collection content
INSERT INTO tags (id, name, active) VALUES
    (UUID(), 'Natural Retreat', TRUE),
    (UUID(), 'Solo Travel', TRUE),
    (UUID(), 'Family Friendly', TRUE),
    (UUID(), 'Perfect for Friends', TRUE),
    (UUID(), 'Romantic Gateway', TRUE),
    (UUID(), 'Stay by the Sea', TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name);
