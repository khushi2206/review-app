# Vandan Review Generator

Web app for **Vandan Distributors** (Visnagar, Gujarat) that helps doctors, technicians, and hospital staff write natural, human-sounding Google review drafts in seconds. Choose your role, how long you’ve worked with the team, and what to highlight — AI drafts the review; copy it and post on Google via the built-in link or QR code.

**Supplies:** CT/MRI contrast media, Iohexol injection, X-ray & CT/MRI films, medical printing, DICOM printing, and radiology consumables.

## Features

- Role-based review drafts (radiologist, technician, hospital staff, etc.)
- Optional highlights and association duration
- OpenRouter AI with automatic model fallback
- Copy review text and QR code for Google reviews

## Setup

1. Copy `config.example.js` to `config.js` if `config.js` does not exist.
2. Either set `OPENROUTER_API_KEY` in `config.js` or paste your key into the on-page key box and save it in the browser.

### Deploy on Vercel

1. Import the repo at [vercel.com](https://vercel.com).
2. Add environment variable **`OPENROUTER_API_KEY`** in Project Settings → Environment Variables for server-side proxy usage.
3. Deploy — the build writes `config.js` from that variable automatically.
4. If you do not want to set a Vercel env var, save a real OpenRouter key in the browser key box before generating reviews.

## Run locally

1. Open `index.html` with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (recommended), or any local server on port 5500.
2. Do not open via `file://` — use `http://127.0.0.1:5500`.

## Google review link

https://g.page/r/CX3SeIkj-1NQEAE/review
