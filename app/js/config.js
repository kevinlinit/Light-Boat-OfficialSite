/**
 * Where the app finds the Mission Timeline backend (github.com/kevinlinit/mission-timeline).
 *
 * API_URL     the published missions: the backend's static API on GitHub Pages, or the server itself.
 * SERVER_URL  the Node server, for signing in, syncing between devices and trips from the studio.
 *             Empty: no sign-in; missions stay in this browser.
 *
 * The deploy workflow writes both from the repository variables API_URL and SERVER_URL
 * (Settings → Secrets and variables → Actions → Variables). Locally: SERVER_URL=… npm start.
 */
export const API_URL = "https://kevinlinit.github.io/mission-timeline/";
export const SERVER_URL = "";
