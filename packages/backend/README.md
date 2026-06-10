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

## Gmail setup (contact form emails)

1. Copy `.env.example` to `.env`.
2. In Google Account → Security, enable 2-Step Verification.
3. Create an [App Password](https://myaccount.google.com/apppasswords) for Mail.
4. Set `SMTP_USER`, `SMTP_PASS`, and `MAIL_TO` in `.env` (example account: `webdev.2301@gmail.com`).

When someone submits the contact form, the backend saves the entry and emails `MAIL_TO` with a structured HTML notification. The frontend then opens WhatsApp with the same inquiry details pre-filled.

## Next steps

- Add authentication for an admin dashboard.
- Rate-limit and validate inputs.
