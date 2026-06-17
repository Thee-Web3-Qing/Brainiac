const PREFIX = "brainiac:og:";
const BASE58 = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";

function mockCID(): string {
  let cid = "Qm";
  for (let i = 0; i < 42; i++) {
    cid += BASE58[Math.floor(Math.random() * BASE58.length)];
  }
  return cid;
}

export interface OGRecord<T = unknown> {
  data: T;
  cid: string;
  savedAt: number;
}

export function saveToOG<T>(key: string, data: T): OGRecord<T> {
  const record: OGRecord<T> = { data, cid: mockCID(), savedAt: Date.now() };
  try { localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(record)); } catch {}
  return record;
}

export function loadFromOG<T>(key: string): OGRecord<T> | null {
  try {
    const raw = localStorage.getItem(`${PREFIX}${key}`);
    return raw ? (JSON.parse(raw) as OGRecord<T>) : null;
  } catch { return null; }
}

export function clearOG(key: string): void {
  try { localStorage.removeItem(`${PREFIX}${key}`); } catch {}
}

export function formatCID(cid: string): string {
  return cid.slice(0, 10) + "..." + cid.slice(-6);
}

export const OG_EXPLORER = "https://explorer.0g.ai";
