DROP ROLE IF EXISTS guest;
DROP ROLE IF EXISTS customer;
DROP ROLE IF EXISTS manager;
DROP ROLE IF EXISTS appuser;

CREATE ROLE appuser NOINHERIT;

CREATE ROLE manager NOINHERIT;
GRANT manager to appuser;

CREATE ROLE customer NOINHERIT;
GRANT customer to appuser;

CREATE ROLE guest NOINHERIT;
GRANT guest to appuser;


GRANT USAGE ON SCHEMA store TO guest;
GRANT USAGE ON SCHEMA store TO customer;
GRANT USAGE ON SCHEMA store TO manager;
GRANT USAGE ON SCHEMA store TO appuser;
