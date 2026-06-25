# Lead Capture & Booking Demo

A small, working booking/lead-capture tool: a public form for customers, and a
simple dashboard for the business owner to see and manage incoming requests.

Built with React + Vite + Tailwind + Supabase, deployable to Vercel in minutes.

## What's in here

- `/` — public booking form (no login needed)
- `/login` — business owner sign-in
- `/dashboard` — protected view of incoming leads, with status tracking

## Setup

1. **Create a Supabase project** at supabase.com (the free tier is enough for a demo).
2. **Run the schema** — open the SQL Editor in your Supabase project and run
   everything in `supabase-schema.sql`.
3. **Create yourself a login** — in Supabase, go to Authentication → Users →
   Add user, and create an email/password login (this becomes the
   "business owner" account for `/login`).
4. **Set your environment variables** — copy `.env.example` to `.env` and fill
   in your project's URL and anon key (Project Settings → API in Supabase).
5. **Install and run locally**:
   ```
   npm install
   npm run dev
   ```
6. **Deploy** — push this to a GitHub repo, import it into Vercel, and add the
   same two environment variables under Vercel's project settings before
   deploying.

## Making this your own for a real pitch

- Swap the heading/copy in `BookingForm.jsx` for whichever business you're
  demoing this to.
- Adjust the palette in `tailwind.config.js` to match a real client's brand.
- Add a Stripe deposit step on submit if a client wants payment collected at
  booking time — natural next feature once this core loop is proven.
- Add email/SMS notifications on new leads (Resend or Twilio) as a paid
  upsell on top of the base build.

## A note on npm security

This project includes an `.npmrc` that disables auto-running install scripts
and refuses packages published in the last 7 days two of the main ways
npm supply-chain malware spreads in 2026. After installing, it's also worth
running:

```
npm audit
```

to check for known vulnerabilities in whatever got installed. None of this
makes installing packages risk-free, but it meaningfully lowers it.


- Row Level Security is already configured: anyone can submit the public
  form, but only a signed-in owner can see or manage leads. That's basic
  security a real client should expect, and most quick demos skip it.
- Status tracking (new/contacted/booked/closed) gives the dashboard an
  obvious next action instead of being a passive list — small detail, but it
  reads as a real product rather than a tutorial CRUD app.
