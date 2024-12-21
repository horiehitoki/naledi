# Stellar

Stellar is an AT Protocol web client with emoji reactions.

# Develop

Write the required environment variables.

```
DATABASE_URL=
SESSION_SECRET=
PRIVATE_KEY_ES256_B64=
```

Run the app.

```
bunx prisma db push

bun install

bun run dev
```

After that, open http://localhost:5173 in your browser.
