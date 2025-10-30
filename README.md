# Portfolio (React + Vite)

This workspace was converted into a React + Vite app from the original static template.

Files of interest
- `public/index.html` — base HTML file Vite uses
- `public/assets/` — put your portrait and images here (create this folder)
- `src/App.jsx` — main React component
- `src/main.jsx` — React entry
- `src/index.css` — styles (ported from the static version)
- `vite.config.js` — Vite configuration
- `package.json` — scripts and dependencies

How to run (PowerShell on Windows):

1. From inside `c:\Users\ITS-LAP-031\OneDrive\Documents\Portfolio` run:

```powershell
npm install
npm run dev
```

2. Open the URL shown by Vite (usually http://localhost:5173).

Customization
- Replace the portrait at `public/assets/photo-placeholder.jpg` or update the path in `src/App.jsx`.
- Edit text, experience entries, and project cards in `src/App.jsx`.
- Colors and layout are in `src/index.css`.

Production build
- `npm run build` to produce a production bundle.
- `npm run preview` to serve the built output locally.

Next steps I can help with
- Wire up routing so each project card has its own page
- Add a contact form (Formspree, Netlify Forms, or EmailJS)
- Improve accessibility and SEO

Tell me which enhancement you'd like next.

Fonts (download locally)
If you want fonts served locally (no Google network calls), run:

```powershell
# from project root
npm run fetch-fonts
```

This runs `public\download-fonts.ps1`, which downloads the Poppins and Playfair Display font files into `public/assets/fonts/` and writes `fonts-local.css`. The app's CSS imports that file when present.