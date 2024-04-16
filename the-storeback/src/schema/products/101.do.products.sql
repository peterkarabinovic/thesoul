CREATE TABLE store.product_collections (
    collection_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    handle TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at BOOLEAN DEFAULT false,
    metadata JSONB,
    
    CONSTRAINT product_collections_handle UNIQUE (handle)
);

CREATE TABLE store.products (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description_1 TEXT,
    description_2 TEXT,
    description_3 TEXT,
    handle TEXT NOT NULL,
    thumbnail_url TEXT,
    weight integer,
    length integer,
    height integer,
    width integer,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at BOOLEAN DEFAULT false,
    metadata JSONB,
    collection_id TEXT,
    discountable boolean DEFAULT true NOT NULL,
    status TEXT NOT NULL CHECK (status = ANY('{draft, published}')) DEFAULT 'draft',
    images TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT idx_unique_product_handle UNIQUE (handle),
    CONSTRAINT product_collection_fk 
  		FOREIGN KEY(collection_id) 
  		REFERENCES store.product_collections(collection_id) ON DELETE SET NULL
);

CREATE INDEX idx_product_title ON store.products(title) WHERE (deleted_at IS NULL);
COMMENT ON COLUMN store.products.handle IS E'@hasDefault';


-- Permissions
GRANT SELECT ON TABLE store.product_collections TO guest;
GRANT SELECT ON TABLE store.product_collections TO customer;
GRANT ALL ON TABLE store.product_collections TO manager;

GRANT SELECT ON TABLE store.products TO guest;
GRANT SELECT ON TABLE store.products TO customer;
GRANT ALL ON TABLE store.products TO manager;