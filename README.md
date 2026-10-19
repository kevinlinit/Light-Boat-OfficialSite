# Light Boat: official site

Light Boat's public website and the Mission Timeline web app customers carry their trip in.

```
index.html, site.css   the home page: how a trip comes together, routes, the app, prices, the questionnaire
app/                   the Mission Timeline web app (published at /app/)
  index.html, js/, css/
  js/config.js         where the backend is (API_URL, SERVER_URL)
  core/                the shared timeline logic, copied from mission-timeline/src/core
scripts/serve.mjs      local static server
scripts/sync-core.mjs  refresh app/core/ from the backend
test/                  checks that every page, script and import resolves
```

The other pieces:

| Repository | What it is |
| --- | --- |
| [mission-timeline](https://github.com/kevinlinit/mission-timeline) | The backend: the API, sign-in, cases, the questionnaire intake, published missions |
| [mission-timeline-management](https://github.com/kevinlinit/mission-timeline-management) | The studio console for staff |
| **Light-Boat-OfficialSite** (this one) | The official site and the Mission Timeline web app |
| [mission-timeline-IOS](https://github.com/kevinlinit/mission-timeline-IOS) | The iPhone app |
| [travel-survey](https://github.com/kevinlinit/travel-survey) | The questionnaire the home page links to |

## The home page

Plain HTML and CSS, no build step. The copy is a starting point: the steps, the six routes (taken from the studio's route catalog in the backend's `src/studio/routes.js`) and the prices (the starting prices from the questionnaire) are all in `index.html`. The "Start the questionnaire" links go to `https://kevinlinit.github.io/travel-survey/`; change them if the questionnaire moves. There's no contact address yet: add one to the footer.

## The app

The same Mission Timeline web app as before, now at `/app/`. It reads published missions from `API_URL` (the backend's static API on GitHub Pages by default) and, when `SERVER_URL` is set, offers Google sign-in, sync between devices and trips shared by the studio. With no `SERVER_URL` everything else works and missions stay in the browser.

## Run it locally

```sh
npm start                                                     # http://127.0.0.1:5173
API_URL=http://127.0.0.1:8080/ SERVER_URL=http://127.0.0.1:8080 npm start   # against a local backend
npm test
```

## Deploy

The `pages` workflow tests the site and publishes it to GitHub Pages on every push to `main`.

1. **Settings → Pages → Source: GitHub Actions**, then re-run the latest `pages` workflow. Until Pages is on, the deploy job fails with "Ensure GitHub Pages has been enabled". GitHub Pages for a **private** repository needs a paid plan (Pro, Team or Enterprise); on the free plan the Pages settings only offer an upgrade. Then either make the repository public (nothing secret lives here: access is enforced by the server) or use another static host.
2. Optional, under **Settings → Secrets and variables → Actions → Variables**: `SERVER_URL` (the backend server, for sign-in) and `API_URL` (published missions, if not the default).
3. With sign-in on, add the site's address to the Google web client's **Authorized JavaScript origins**.

### Another static host

Cloudflare Pages, Netlify and Vercel all serve private repositories for free. Connect the repository, leave the build command empty and the output folder as the repository root, and put the backend's address in `app/js/config.js` (commit it, since those hosts don't run the workflow).

## The shared core

`app/core/` is a copy of `src/core` from the backend; `app/core/VERSION` says which commit. After the core changes there, run `npm run sync-core` (or `npm run sync-core -- ../mission-timeline` from a local checkout). The deploy workflow warns when it has fallen behind.
