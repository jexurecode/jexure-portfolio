# JEXURE — Developer Portfolio

A responsive personal portfolio built with plain HTML, CSS and JavaScript.

## Run locally

1. Extract the ZIP.
2. Open `index.html` in a modern browser, or serve this folder with a local static server.
3. Keep the `assets/` folder beside `index.html`, `style.css` and `script.js` so all images load.

## Customize before publishing

- **GitHub:** the profile links currently point to `https://github.com/jexurecode`.
- **Email:** the contact section uses `jexurecode@gmail.com` and opens the visitor's email app (`mailto:`); it does not send messages through a server.
- **Projects and skills:** edit `data.js` only. The project cards and skill cards are generated from that file, so you do not need to rewrite HTML or the main JavaScript.
- **Add a project:** copy one object in `projects`, change its `title`, `category` (`web` or `app`), `image`, `description`, `tags`, and `link`. Put the image in `assets/projects/`. Leave `link: ''` until a real demo or repository URL exists.
- **Update skill levels:** edit the `skills` list in `data.js`. Use honest labels such as `Beginner`, `Intermediate`, `Advanced`, or `Learning`; adjust `progress` to match your own estimate.
- **Automatic stats:** the project, language, technology and learning counts are calculated from `data.js`. They update when you add/remove projects or skills; no manual stat editing is needed.
- **Portraits and project covers:** replace images in `assets/` while keeping filenames, or update the paths in `index.html` / `script.js`.
- **Social profiles:** only the GitHub and email links are included until other profile URLs are known.

## Theme behavior

- On a first visit, the site automatically matches the visitor's operating-system/browser light or dark preference.
- If the visitor changes their system theme while the site is open, the portfolio follows it until they manually choose a theme.
- Clicking the theme toggle saves that choice in the browser, so it remains selected on later visits. The saved manual choice takes priority over the system preference.
- To return to automatic system detection, clear the browser's site data for this portfolio (or run `localStorage.removeItem('jexure-theme')` in the browser console while the site is open).

## Easy updates

The main content is separated into `data.js`. You can add projects and update skill levels there without editing `index.html` or the main `script.js`.

## Improvements in this version

- Added a mobile navigation menu and semantic navigation links.
- Replaced placeholder GitHub, LinkedIn and X destinations with the known GitHub profile and email contact.
- Removed unverifiable latency / project-count / coding-hours claims and used modest portfolio-focused stats instead.
- Added required-field validation and clearer feedback for the email-app contact workflow.
- Reduced canvas animation workload, paused it when the page is hidden, and respected reduced-motion preferences.
- Added accessible labels, live status text, a dynamic copyright year and responsive refinements.

## Hosting

This is a static website and can be hosted on GitHub Pages or another static hosting service. Check that all local assets are included when uploading.
