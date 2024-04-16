CREATE TABLE store.images (
    image_url VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Smart tags
COMMENT ON TABLE store.images IS E'@omit create,update,delete';

-- Permissions
GRANT SELECT ON TABLE store.images TO guest;
GRANT SELECT ON TABLE store.images TO customer;
GRANT ALL ON TABLE store.images TO manager;

