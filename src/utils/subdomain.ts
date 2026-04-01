const hostname = typeof window !== "undefined" ? window.location.hostname : "";

/** true su app.thermodmr.com */
export const isAppDomain =
  hostname === "app.thermodmr.com";

/** true su thermodmr.com / www.thermodmr.com */
export const isWwwDomain =
  hostname === "thermodmr.com" || hostname === "www.thermodmr.com";

/** true in locale (localhost / 127.x) — nessun redirect cross-domain */
export const isDev =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname.startsWith("192.168.");

export const APP_URL = "https://app.thermodmr.com";
export const WWW_URL = "https://thermodmr.com";

/** Redirect hard verso un URL esterno (cross-domain) */
export const redirectTo = (url: string) => {
  window.location.replace(url);
};
