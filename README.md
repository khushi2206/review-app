# Vandan Review Generator

Web app for **Vandan Distributors** (Visnagar, Gujarat) that helps doctors, technicians, and hospital staff write natural, human-sounding Google review drafts in seconds. Choose your role, how long you’ve worked with the team, and what to highlight — AI drafts the review; copy it and post on Google via the built-in link or QR code.

**Supplies:** CT/MRI contrast media, Iohexol injection, X-ray & CT/MRI films, medical printing, DICOM printing, and radiology consumables.

## Features

- Role-based review drafts (radiologist, technician, hospital staff, etc.)
- Optional highlights and association duration
- OpenRouter AI with automatic model fallback
- Copy review text and QR code for Google reviews

## Setup

1. Copy `config.example.js` to `config.js`.
2. Add your [OpenRouter API key](https://openrouter.ai/keys) in `config.js` (`config.js` is not pushed to Git).

## Run locally

1. Open `index.html` with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (recommended), or any local server on port 5500.
2. Do not open via `file://` — use `http://127.0.0.1:5500`.

## Google review link

https://g.page/r/CX3SeIkj-1NQEAE/review
