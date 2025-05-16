# naledi-appview

This is a Naledi AppView Server.

# Develop

Write the required environment variables.

```
DB_NAME=
DB_USER=
DB_PASS=

DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@db:5432/postgres?schema=public

PORT=
```

Run the app.

```
docker-compose up
```

After that, open http://localhost:${PORT} in your browser.
