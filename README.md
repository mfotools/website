# MyFINANCE Online — firm website

Static marketing website for **www.myfinance-online.co.za**, built with
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Pure static output — no server-side runtime. **Hosted on GitHub Pages**:
every push to `main` triggers the Actions workflow
(`.github/workflows/deploy.yml`), which builds the site and publishes it.
The output is still portable static HTML, so it can be copied onto any
other web host (IIS, Apache, nginx, cPanel) if hosting ever changes.

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

## Deploy workflow (GitHub Pages)

Deployment is automatic: **push to `main` and GitHub Actions builds and
publishes the site.** No manual upload, no hosting company to notify per
release.

1. Edit content, then `npm run build` (optional locally — the workflow
   builds too, but a local build catches errors before you push).
2. Commit and push to `main`.
3. The `Deploy to GitHub Pages` workflow runs; the live site updates in a
   minute or two.

**One-time GitHub setup** (in the repo on github.com — can't be scripted):

- **Settings → Pages → Source: "GitHub Actions"**.
- **Settings → Pages → Custom domain:** `www.myfinance-online.co.za`, then
  tick **Enforce HTTPS** once the certificate is issued.

**One-time DNS** (at whoever manages the `myfinance-online.co.za` DNS zone):

- `www` → **CNAME** → `mfotools.github.io`
- apex `myfinance-online.co.za` → **A** records `185.199.108.153`,
  `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and the matching
  `AAAA` records for IPv6) so the bare domain redirects to `www`.

The custom domain is kept by `public/CNAME` (copied into every build as
`dist/CNAME`); GitHub Pages reads it to hold the domain across deploys.

Because every page builds as `<page>/index.html` (Astro's default
"directory" format), clean URLs like `/services` work with zero rewrite
configuration. A `web.config` is included for IIS hosts and is harmless on
Pages.

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
