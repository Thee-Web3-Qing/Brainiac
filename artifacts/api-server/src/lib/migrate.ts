import { query } from "./db.js";
import type { Logger } from "pino";

/**
 * Runs idempotent DDL migrations on startup.
 * All statements use IF NOT EXISTS so they are safe to run repeatedly.
 */
export async function runMigrations(logger: Logger): Promise<void> {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS telegram_sessions (
        privy_user_id TEXT PRIMARY KEY,
        session_string TEXT NOT NULL,
        tracked_chats  JSONB NOT NULL DEFAULT '[]',
        updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    logger.info("DB migrations applied");
  } catch (err) {
    logger.error({ err }, "DB migration failed — server will start but Telegram session persistence may not work");
  }
}
