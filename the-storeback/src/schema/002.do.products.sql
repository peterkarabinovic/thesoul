CREATE TABLE store.product_collections (
    collection_id TEXT NOT NULL,
    title TEXT NOT NULL,
    handle TEXT,
    width integer,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at BOOLEAN DEFAULT false,
    metadata JSONB,
    CONSTRAINT product_collections_pkey PRIMARY KEY (collection_id),
    CONSTRAINT product_collections_handle UNIQUE (handle)
);

CREATE TABLE store.products (
    product_id TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
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

    CONSTRAINT product_pkey PRIMARY KEY (product_id),
    CONSTRAINT product_handle UNIQUE (handle),
    CONSTRAINT product_collection_fk 
  		FOREIGN KEY(collection_id) 
  		REFERENCES store.product_collections(collection_id) ON DELETE SET NULL
);

CREATE INDEX idx_product_title ON store.products(title) WHERE (deleted_at IS NULL);