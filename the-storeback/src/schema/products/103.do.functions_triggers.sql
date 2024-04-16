CREATE OR REPLACE FUNCTION store.handle_from_string(original_string text)
RETURNS text AS $$
DECLARE
    key text;
    value text;
    lowercase_string text := lower(original_string);
    replacements jsonb := '{
        " " : "-",
        "№": "",
    	"а": "a",
    	"б": "b",
    	"в": "v",
    	"г": "h",
    	"ґ": "g",
    	"д": "d",
    	"е": "e",
    	"з": "z",
    	"и": "y",
    	"й": "i",
    	"і": "i",
    	"ї": "i",
    	"к": "k",
    	"л": "l",
    	"м": "m",
    	"н": "n",
    	"о": "o",
    	"п": "p",
    	"р": "r",
    	"с": "s",
    	"т": "t",
    	"у": "u",
    	"ф": "f",
    	"ь": "",
    	"ж": "zh",
    	"х": "kh",
    	"ц": "ts",
    	"ч": "ch",
    	"ш": "sh",
    	"щ": "shch",
    	"є": "ie",
    	"ю": "iu",
    	"я": "ia",
        "ы": "y",
        "ъ": "y",
        "э": "e",
        "ё": "yo"
    }';
BEGIN
    FOR key, value IN 
    SELECT j.key, j.value::text
    FROM jsonb_each_text(replacements) j
    LOOP
        lowercase_string := replace(lowercase_string, key, value);
    END LOOP;
    RETURN lowercase_string;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT;



-- Triggers
CREATE OR REPLACE FUNCTION store.products_handle_tune() RETURNS TRIGGER AS 
$$
BEGIN
    NEW.handle = COALESCE(NEW.handle, store.handle_from_string(NEW.title));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_handle_tune  
        BEFORE INSERT ON store.products
        FOR EACH ROW EXECUTE FUNCTION store.products_handle_tune();


CREATE OR REPLACE FUNCTION store.products_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at 
        BEFORE UPDATE ON store.products
        FOR EACH ROW EXECUTE FUNCTION store.products_updated_at();