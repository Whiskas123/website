import { headers } from "next/headers";

const rateLimit = new Map();

export function getRateLimitInfo(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  const max = 5; // max 5 requests per window

  const tokenTimestamp = Math.floor(now / windowMs);
  const tokenKey = `${ip}-${tokenTimestamp}`;

  const currentTokens = rateLimit.get(tokenKey) || 0;

  return {
    isRateLimited: currentTokens >= max,
    remainingTokens: Math.max(0, max - currentTokens),
    tokenKey,
  };
}

export function incrementRateLimit(tokenKey) {
  const currentTokens = rateLimit.get(tokenKey) || 0;
  rateLimit.set(tokenKey, currentTokens + 1);
}
