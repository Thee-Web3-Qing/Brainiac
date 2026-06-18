# Brainiac

**Your personal Web3 intelligence dashboard — catch up on everything that matters in seconds.**

Brainiac aggregates signals from Discord, Telegram, and on-chain wallet activity into a single, AI-powered feed. Built for the Zero Cup hackathon.

---

## What it does

You spend hours every day context-switching between Discord servers, Telegram groups, and wallet trackers trying to stay current. Brainiac fixes that.

- **Feed Intelligence** — reads Discord channels and Telegram groups *as you*, using your own account credentials (no bot invite, no admin access required). Signals are tagged and ranked automatically: Alpha, Whale Alert, Vote, Launch, NFT.
- **AI Briefing** — Qwen AI summarises your wallet balances, recent transactions, and live community signals into a short morning brief every time you open the dashboard.
- **Wallet Monitor** — connects to your Privy-managed EVM and Solana wallets via Alchemy. Tracks balances, recent transactions, and flags unusual activity.
- **On-chain Login History** — every login is recorded on the 0G Newton testnet (chain 16602). Tamper-proof, permanent, yours.

---

## Architecture

```
brainiac/                    # monorepo root (pnpm workspaces)
├── artifacts/
│   ├── brainiac/            # React 18 + Vite frontend
│   │   ├── src/
│   │   │   ├── pages/       # Dashboard, Feed, Wallet, Brain, Landing
│   │   │   ├── components/  # Layout, shadcn/ui primitives, OG login history
│   │   │   ├── hooks/       # use-mobile, use-toast
│   │   │   └── lib/         # og-storage, wallet-activity, utils
│   │   └── vite.config.ts
│   └── api-server/          # Express 5 backend
│       └── src/routes/
│           ├── brain.ts         # /api/brain — Qwen AI briefings
│           ├── discord.ts       # /api/discord — OAuth + channel messages
│           ├── telegram.ts      # /api/telegram — bot updates
│           ├── telegram-user.ts # /api/telegram/user — MTProto user auth
│           ├── wallet.ts        # /api/wallet — Alchemy balance & tx data
│           └── og.ts            # /api/og — 0G Newton login ledger
├── lib/
│   ├── api-spec/            # OpenAPI spec + Orval codegen config
│   ├── api-client-react/    # Generated TanStack Query hooks
│   ├── api-zod/             # Generated Zod schemas
│   └── db/                  # Drizzle ORM schema + client
└── pnpm-workspace.yaml
```

**Frontend stack:** React 18, Vite, wouter (routing), TanStack Query, Tailwind CSS v4, shadcn/ui, Privy (wallet auth)

**Backend stack:** Express 5, TypeScript, esbuild, GramJS (Telegram MTProto), Pino logging

---

## Key features in depth

### Telegram — reads as you (MTProto)

Most dashboards make you add a bot to every group and grant it admin privileges. Brainiac uses the Telegram MTProto API via GramJS so it authenticates as your own account:

1. Enter your phone number — Telegram sends a login code to your app
2. Enter the code — Brainiac receives a session string (stored locally, never on any server)
3. Pick which groups/channels to monitor — Brainiac polls them every 60 seconds

The session string lives in your browser's `localStorage`. No account credentials are stored server-side.

### Discord — reads as you (OAuth)

Standard Discord OAuth2 with `identify`, `guilds`, and `guilds.channels.read` scopes. After sign-in, Brainiac calls the Discord REST API using *your* bearer token to read only the channels you can already see. No bot, no Manage Server permission needed.

### AI Briefing (Qwen)

The `/api/brain/briefing` endpoint collects:
- Live wallet balances from Alchemy
- Recent community signals from the feed context
- Any injected notes

It sends these to Qwen (`qwen-turbo`) and streams back a structured brief. The frontend shows this in the Dashboard's Briefing Card, refreshed on demand.

### On-chain login history (0G Newton)

Every successful Privy login appends a record to a smart contract on the 0G Newton testnet (chain ID 16602, RPC: `https://evmrpc-testnet.0g.ai`). The history is displayed in the Dashboard and is immutable — you can always prove when and where you accessed your account.

### Wallet dashboard (Alchemy)

Privy exposes the user's connected EVM and Solana wallets. Brainiac feeds those addresses to Alchemy's Token API and Transaction History API to show:
- Token balances with USD values
- Recent transactions with decoded labels
- Activity sparklines

---

## Getting started

### Prerequisites

- Node.js 20+
- pnpm 9+
- A Privy account ([privy.io](https://privy.io)) — for wallet auth
- A Telegram account and API credentials ([my.telegram.org/apps](https://my.telegram.org/apps))
- A Discord application ([discord.com/developers](https://discord.com/developers/applications))
- An Alchemy API key ([alchemy.com](https://www.alchemy.com))
- A Qwen API key ([dashscope.aliyuncs.com](https://dashscope.aliyuncs.com))

### Environment variables

Create a `.env` file in `artifacts/api-server/`:

```env
# Privy
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret

# Telegram MTProto (from my.telegram.org/apps)
TELEGRAM_API_ID=12345678
TELEGRAM_API_HASH=your_api_hash_here

# Telegram Bot (optional — for bot-based updates)
TELEGRAM_BOT_TOKEN=your_bot_token

# Discord OAuth
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_BOT_TOKEN=your_bot_token

# Alchemy
ALCHEMY_API_KEY=your_alchemy_key

# Qwen AI
QWEN_API_KEY=your_qwen_key

# 0G Newton (funded wallet private key for logging)
OG_PRIVATE_KEY=your_wallet_private_key
```

Create a `.env` file in `artifacts/brainiac/`:

```env
VITE_PRIVY_APP_ID=your_privy_app_id
```

### Install and run

```bash
# Install all workspace dependencies
pnpm install

# Start the API server (port auto-assigned by Replit)
pnpm --filter @workspace/api-server run dev

# Start the frontend (separate terminal)
pnpm --filter @workspace/brainiac run dev
```

The frontend proxies `/api/*` requests to the API server automatically via Vite's proxy config.

---

## API reference

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/brain/briefing` | Generate an AI brief (Qwen). Body: `{ wallets, feedContext }` |
| `GET`  | `/api/discord/auth` | Begin Discord OAuth flow |
| `GET`  | `/api/discord/callback` | OAuth callback |
| `GET`  | `/api/discord/channels/:guildId` | List channels (requires `x-discord-token` header) |
| `GET`  | `/api/discord/messages/:guildId/:channelId` | Read messages (requires `x-discord-token`) |
| `POST` | `/api/telegram/user/auth/start` | Send OTP to phone number |
| `POST` | `/api/telegram/user/auth/verify` | Verify OTP, return session string |
| `GET`  | `/api/telegram/user/dialogs` | List user's groups/channels (requires `x-tg-session`) |
| `GET`  | `/api/telegram/user/messages/:chatId` | Read messages from a chat (requires `x-tg-session`) |
| `GET`  | `/api/wallet/balance/:address` | Token balances via Alchemy |
| `GET`  | `/api/wallet/transactions/:address` | Recent transactions via Alchemy |
| `POST` | `/api/og/log-login` | Record login on 0G Newton testnet |
| `GET`  | `/api/og/login-history/:address` | Fetch login history from chain |
| `GET`  | `/api/health` | Liveness check |

---

## Privacy model

- **Telegram session strings** — stored only in the user's browser `localStorage`. Never sent to or stored on Brainiac's servers beyond the duration of an API call.
- **Discord tokens** — same: `localStorage` only, used client-side to call the proxy.
- **Wallet addresses** — read-only. Brainiac never requests signing permissions for anything other than the 0G login ledger (which the user explicitly initiates).
- **AI context** — wallet data and feed snippets are sent to Qwen's API for briefing generation. No data is stored by Brainiac after the response.

---

## Hackathon context

Built for the **Zero Cup** hackathon. The 0G integration demonstrates how a lightweight testnet can serve as a permanent, user-owned audit log without any centralised database. Each login event costs a small amount of A0GI (0G's testnet token) and is readable by anyone — the user controls their own history.

---

## License

MIT
