---
name: GramJS ESM import fix
description: How to import GramJS StringSession in an ESM Node.js context without ERR_UNSUPPORTED_DIR_IMPORT
---

The `telegram` (GramJS) package uses CJS internally. When the API server bundle runs as ESM (Node 24), `import { StringSession } from "telegram/sessions"` throws `ERR_UNSUPPORTED_DIR_IMPORT` because Node ESM doesn't allow directory imports.

**Fix:** Import from the main package's sessions export:
```typescript
import { TelegramClient, sessions as tgSessions, Api } from "telegram";
const { StringSession } = tgSessions;
```

Also externalize `"telegram"` and `"telegram/*"` in esbuild so the package is loaded at runtime (not bundled), which avoids other CJS/ESM resolution issues.

**Why:** Node.js ESM resolver requires explicit file extensions or index.js files; `telegram/sessions` resolves to a directory without an explicit path, crashing at startup.

**How to apply:** Any route file that imports from GramJS subpaths should use this pattern.
