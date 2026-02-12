const TWITTER_HOSTS = new Set([
  "x.com",
  "twitter.com",
  "www.x.com",
  "www.twitter.com",
  "mobile.x.com",
  "mobile.twitter.com",
]);

export function isTwitterUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return TWITTER_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

export function transformUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!TWITTER_HOSTS.has(parsed.hostname)) return null;
    parsed.hostname = "vxtwitter.com";
    return parsed.toString();
  } catch {
    return null;
  }
}
