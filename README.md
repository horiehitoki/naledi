# Naledi

Naledi is a fork of [Stellar](https://github.com/marukun712/stellar) with an AT Protocol web client and emoji reactions.

## Getting Started

Install NPM packages in the project directory.

```bash
npm install
```

Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The following environment variables are required:

- `NEXTAUTH_SECRET` (generate one using `openssl rand -base64 32` or visit [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)).
- `NEXTAUTH_URL` (`http://localhost:3000` while running locally.)

## License

MIT License
