SELECT 'CREATE DATABASE codrrdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'codrrdb')\gexec