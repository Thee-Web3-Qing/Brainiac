import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Request } from "express";

const PRIVY_APP_ID =
  process.env.PRIVY_APP_ID ?? "cmqird7xu001q0clehy0nua8b";

const JWKS_URL = `https://auth.privy.io/api/v1/apps/${PRIVY_APP_ID}/jwks.json`;

let remoteJwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function getJwks() {
  if (!remoteJwks) {
    remoteJwks = createRemoteJWKSet(new URL(JWKS_URL));
  }
  return remoteJwks;
}

/**
 * Extracts and verifies the Privy Bearer token from the Authorization header.
 * Returns the Privy user ID (sub claim) or null if the token is absent/invalid.
 */
export async function getPrivyUserId(req: Request): Promise<string | null> {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return null;

  const token = auth.slice(7);
  try {
    const { payload } = await jwtVerify(token, getJwks(), {
      issuer: `privy.io`,
      audience: PRIVY_APP_ID,
    });
    const sub = payload.sub;
    if (typeof sub !== "string" || !sub) return null;
    return sub;
  } catch {
    return null;
  }
}
