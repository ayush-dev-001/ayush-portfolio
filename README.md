# Ayush Tripathi — Portfolio

A React + Vite portfolio site with a light, card-based design (dark-green pill navbar, lavender portrait card, floating highlight cards).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Edit content
All the text on the site (profile, skills, experience, projects, awards, education) is in `src/data.js`.
- Photo: add `public/profile.png` (a transparent-background cut-out looks best, like the hero reference). Until then, your initials show.
- Resume: replace `public/Ayush_Tripathi_CV.pdf`
- Project links: set `github` / `live` for each project in `data.js`
- Colors and fonts: change the CSS variables at the top of `src/index.css` (light theme) and under `:root[data-theme='dark']` (dark theme)
- Theme: the site always opens in light mode. The sun/moon button in the navbar switches to dark mode, and the visitor's choice is remembered on later visits.

## Layout & scrolling
- Normal, natural scrolling. On laptops and desktops each section is exactly one screen tall (`src/components/Screens.jsx`) and gently shrinks and fades as you scroll past it. Phones use natural section heights with no transforms, so text stays sharp.
- Sizes are in `rem`, and the root font size follows the screen height on desktop (`clamp(12.5px, 1.6vh, 16px)` in `src/index.css`), so it looks right at the browser's normal 100% zoom. Raise or lower those numbers to make everything bigger or smaller.
- Work experience and Projects scroll horizontally (`src/components/HScroll.jsx`). Add entries to `experience` or `projects` in `data.js` and they appear as new cards. Arrows, a counter and a progress bar appear once there are more cards than fit.
- The navbar belongs to the first screen (not sticky). Side dots, a progress bar and a back-to-top button help with navigation.

## Animations
- Dark mode shows an animated space background (`src/components/Starfield.jsx`): twinkling parallax stars, shooting stars and drifting nebula glows. It pauses when the tab is hidden and goes static if the visitor prefers reduced motion.
- Sections animate in every time they scroll into view (`src/components/Reveal.jsx`). Variants: `up`, `left`, `right`, `zoom`, `blur`. Pass `once` to animate only the first time.

## Security
This is a static site (no server, no database, no forms, no API keys), which keeps the attack surface small. On top of that:

- **Security headers** (`vercel.json`): a strict Content Security Policy (only this site's own scripts can run; styles and fonts only from this site and Google Fonts), HSTS, clickjacking protection (`X-Frame-Options: DENY` + `frame-ancestors 'none'`), `nosniff`, a strict referrer policy, and a Permissions Policy that turns off camera, mic, location and more.
- **Safe links** (`src/lib/links.jsx`): external links open with `rel="noopener noreferrer"`, and only `https:`, `mailto:`, in-page `#` and same-site links are allowed.
- **Personal data:** no phone number anywhere in the code or the public CV. The email address is stored in two parts and joined in the browser, which keeps it away from simple spam scrapers.
- **Images:** photos are stripped of hidden metadata (location, camera info).
- **Repo hygiene:** `.gitignore` blocks `.env` files and keys; Dependabot (`.github/dependabot.yml`) opens PRs for vulnerable dependencies. Run `npm audit` before deploying.

If you add inline `<script>` tags or load scripts/styles from another site, update the `Content-Security-Policy` in `vercel.json`, or the browser will block them.
Check your live headers at https://securityheaders.com.

## Structure
```
src/
  data.js            # all content
  App.jsx            # page layout
  index.css          # styles and theme
  components/        # Nav, Hero, About, Skills, Experience, Projects, Awards, Contact
```

## Deploy on Vercel
**Option A: GitHub (recommended, redeploys automatically on every push)**
1. Create a new GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. Go to vercel.com, choose **Add New → Project**, and import the repository.
3. Vercel detects Vite automatically (settings are also in `vercel.json`). Click **Deploy**.

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

Before deploying, check that it builds locally: `npm install && npm run build`.
