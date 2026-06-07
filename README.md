# rohitkapoor.dev

Personal portfolio site for Rohit Kapoor — Principal Engineer at AWS, London.

## Stack

- **Vite 5** — build tool
- **Vanilla HTML / CSS / JS** — no framework
- **Google Fonts** — Bricolage Grotesque, Hanken Grotesk, JetBrains Mono
- **GitHub Pages** — hosting via `gh-pages`

## Structure

```
index.html          — main page
src/
  styles.css        — design system & all styles
  App.js            — interactions (grid canvas, cursor, scroll reveal, counters, lightbox)
  image-slot.js     — web component for drag-drop photo placeholders
public/
  CNAME             — rohitkapoor.dev
vite.config.js
```

## Sections

1. **Hero** — name, role, animated grid background, live GMT clock
2. **The Work** — animated stat counters, timeline of work at AWS
3. **Light & Frame** — photo gallery with lightbox (placeholders, ready for photos)
4. **About** — bio, education, interests
5. **Contact** — email, LinkedIn, Instagram

## Development

```bash
npm install
npm start        # dev server at localhost:5173
npm run build    # production build → dist/
npm run deploy   # deploy to GitHub Pages
```

## Adding Photos

Drop images onto the photo slots in the browser, or replace the `<image-slot>` elements in `index.html` with `<img>` tags pointing to files in `public/`.
