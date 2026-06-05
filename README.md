# MyFINANCE Online — firm website

Static marketing website for **www.myfinance-online.co.za**, built with
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Pure static output — no server-side runtime. Deploy by copying the built
`dist/` folder onto any web host (IIS, Apache, nginx, b12, cPanel — anything
that serves static files).

> This is **separate** from the Virta product site in `../website/`. Same
> tooling and conventions, different brand and content.

---

## Quick start

```powershell
cd C:\virta3\MFO
npm install            # first time only
npm run dev            # local preview at http://localhost:4321
npm run build          # produces dist/  ← this is what gets deployed
```

## Deploy workflow

1. `npm run build` — regenerates `dist/`.
2. Commit (`dist/` **is** committed — see `.gitignore`).
3. Push to GitHub.
4. Tell the hosting company to publish the contents of `MFO/dist/` to the
   web root for `www.myfinance-online.co.za`. (They copy the **contents** of
   `dist/`, not the `dist` folder itself.)

Because every page builds as `<page>/index.html` (Astro's default
"directory" format), clean URLs like `/services` work on any host with zero
rewrite configuration. A `web.config` is included for IIS hosts (MIME types,
404, security headers) and is harmless elsewhere.

---

## Contact forms (Web3Forms)

The three forms on `/contact` (general message, request-a-quote, book-a-callback)
post directly to [Web3Forms](https://web3forms.com), which emails the
submissions to you. **No backend required.**

**One-time setup — you must do this before the forms work:**

1. Go to https://web3forms.com, enter the email address that should receive
   submissions, and copy the **Access Key** it gives you (it's free).
2. Open `src/pages/contact.astro` and replace
   `PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE` with that key.
3. `npm run build`, commit, redeploy.

All three forms share the one key; each sets a distinct **subject** line
("Quote request", "Callback request", "General message") so you can tell them
apart in your inbox. After submitting, visitors are sent to `/thank-you`.

Want heavier forms later (e.g. client onboarding with file uploads)? Embed a
[Jotform](https://www.jotform.com) iframe on a new page — that path was
discussed and kept open.

---

## Editing content

- **Brand colours:** `tailwind.config.mjs` → `navy` (blue) and `accent`
  (orange). Change them once and the whole site re-themes.
- **Pages:** `src/pages/*.astro` — `index` (home), `services`, `about`,
  `contact`, plus `thank-you` and `404`.
- **Nav / footer:** `src/components/Nav.astro`, `Footer.astro`.
- **Site-wide head / SEO:** `src/layouts/Base.astro`.

### Placeholders to confirm

Email (`tax@myfinance-online.co.za`) and address (100 Waverley Road,
Bloemfontein) are set. No phone number is shown by design. Office hours
("Mon–Fri, 08:00–17:00") are an assumption — search `TODO` to confirm. The
"Client login" links point at the Virta portal
(`newportal.virta.co.za/login`); change if the firm uses a different login.
