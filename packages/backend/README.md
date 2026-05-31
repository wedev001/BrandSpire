# @brandspire/backend

Placeholder Express API for BrandSpire. Health + contact endpoints scaffolded — extend with DB, auth, mailer, etc.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

Server starts at `http://localhost:4000`.

## Endpoints

| Method | Path           | Purpose                          |
|--------|----------------|----------------------------------|
| GET    | `/api/health`  | health check                     |
| POST   | `/api/contact` | accepts contact-form submissions |

## Next steps

- Persist contact submissions (Postgres / MongoDB).
- Email notifications via SMTP / SendGrid / Resend.
- Add authentication for an admin dashboard.
- Rate-limit and validate inputs.
