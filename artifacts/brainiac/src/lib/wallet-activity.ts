export type ActivityType = "swap" | "deposit" | "withdraw" | "mint" | "stake" | "claim" | "bridge";

export type ChainActivity = {
  id: string;
  date: string;
  daysAgo: number;
  type: ActivityType;
  protocol: string;
  chain: string;
  description: string;
  tokenIn?: string;
  tokenOut?: string;
  usdValue: string;
  apy?: string;
  yieldEarned?: string;
};

const ETH_TEMPLATES: Omit<ChainActivity, "id" | "date" | "chain">[] = [
  { daysAgo: 1,  type: "swap",     protocol: "Uniswap V3",          description: "Swapped 1.2 ETH for 4,320 USDC",                    tokenIn: "ETH",  tokenOut: "USDC",  usdValue: "$4,320" },
  { daysAgo: 2,  type: "deposit",  protocol: "Aave V3",             description: "Deposited 3,000 USDC as collateral",                 tokenIn: "USDC",               usdValue: "$3,000", apy: "6.8%",  yieldEarned: "$204/yr" },
  { daysAgo: 4,  type: "stake",    protocol: "Lido",                description: "Staked 2.0 ETH for stETH liquid staking",            tokenIn: "ETH",  tokenOut: "stETH", usdValue: "$7,200", apy: "4.2%",  yieldEarned: "$302/yr" },
  { daysAgo: 5,  type: "claim",    protocol: "Convex Finance",      description: "Claimed CRV + CVX staking rewards",                                                    usdValue: "$127",   yieldEarned: "$127 received" },
  { daysAgo: 7,  type: "deposit",  protocol: "Curve Finance",       description: "Added USDC/USDT/DAI to 3pool",                       tokenIn: "USDC",               usdValue: "$2,000", apy: "3.1%",  yieldEarned: "$62/yr" },
  { daysAgo: 10, type: "swap",     protocol: "Uniswap V3",          description: "Swapped 5,000 USDC for 0.14 WBTC",                   tokenIn: "USDC", tokenOut: "WBTC",  usdValue: "$5,000" },
  { daysAgo: 14, type: "mint",     protocol: "ApeXplorer",          description: "Minted ApeXplorer #3421 (free + gas only)",                                            usdValue: "$28" },
  { daysAgo: 16, type: "bridge",   protocol: "Stargate / LayerZero", description: "Bridged 1.5 ETH to Base chain",                     tokenIn: "ETH",                usdValue: "$5,400" },
  { daysAgo: 20, type: "withdraw", protocol: "Aave V3",             description: "Withdrew 3,043 USDC after 18-day deposit",                            tokenOut: "USDC",  usdValue: "$3,043", yieldEarned: "+$43 interest earned" },
  { daysAgo: 25, type: "swap",     protocol: "1inch",               description: "Swapped 500 USDT for ETH at best available rate",    tokenIn: "USDT", tokenOut: "ETH",   usdValue: "$500" },
];

const BASE_TEMPLATES: Omit<ChainActivity, "id" | "date" | "chain">[] = [
  { daysAgo: 1,  type: "deposit",  protocol: "Aerodrome",           description: "Added ETH/USDC LP position with veAERO boost",       tokenIn: "ETH",               usdValue: "$3,200", apy: "22.4%", yieldEarned: "$717/yr" },
  { daysAgo: 3,  type: "claim",    protocol: "Aerodrome",           description: "Claimed AERO emission rewards",                                                        usdValue: "$89",    yieldEarned: "$89 received" },
  { daysAgo: 5,  type: "swap",     protocol: "BaseSwap",            description: "Swapped 2,000 USDC for 556 AERO tokens",             tokenIn: "USDC", tokenOut: "AERO",  usdValue: "$2,000" },
  { daysAgo: 7,  type: "deposit",  protocol: "Moonwell",            description: "Deposited 1,000 USDC, borrow capacity unlocked",     tokenIn: "USDC",               usdValue: "$1,000", apy: "5.9%",  yieldEarned: "$59/yr" },
  { daysAgo: 10, type: "bridge",   protocol: "Base Official Bridge", description: "Received 1.5 ETH bridged from Ethereum",                             tokenOut: "ETH",   usdValue: "$5,400" },
  { daysAgo: 12, type: "stake",    protocol: "Beefy Finance",       description: "Auto-compounding USDC/cbETH LP vault",                                               usdValue: "$1,800", apy: "16.7%", yieldEarned: "$300/yr" },
  { daysAgo: 18, type: "swap",     protocol: "BaseSwap",            description: "Swapped 0.5 ETH for 1,800 USDC",                     tokenIn: "ETH",  tokenOut: "USDC",  usdValue: "$1,800" },
];

const ARB_TEMPLATES: Omit<ChainActivity, "id" | "date" | "chain">[] = [
  { daysAgo: 1,  type: "deposit",  protocol: "Camelot V3",          description: "Added USDC/USDT concentrated liquidity position",    tokenIn: "USDC",               usdValue: "$5,000", apy: "18.3%", yieldEarned: "$915/yr" },
  { daysAgo: 2,  type: "claim",    protocol: "Radiant Capital",     description: "Claimed RDNT rewards, dLP position unlocked",                                         usdValue: "$210",   yieldEarned: "$210 received" },
  { daysAgo: 4,  type: "stake",    protocol: "Pendle Finance",      description: "Bought PT-eETH June expiry — fixed 12.1% APY",       tokenIn: "ETH",               usdValue: "$2,800", apy: "12.1%", yieldEarned: "$339/yr" },
  { daysAgo: 6,  type: "swap",     protocol: "GMX",                 description: "Swapped 3,000 USDC for 0.83 ETH (zero slippage)",    tokenIn: "USDC", tokenOut: "ETH",   usdValue: "$3,000" },
  { daysAgo: 9,  type: "deposit",  protocol: "Radiant Capital",     description: "Deposited 2,000 USDC earning 14.2% APY",             tokenIn: "USDC",               usdValue: "$2,000", apy: "14.2%", yieldEarned: "$284/yr" },
  { daysAgo: 12, type: "claim",    protocol: "Camelot V3",          description: "Collected LP trading fees and GRAIL rewards",                                          usdValue: "$167",   yieldEarned: "$167 received" },
  { daysAgo: 16, type: "swap",     protocol: "GMX",                 description: "Opened 2x ETH long with $1,500 USDC collateral",     tokenIn: "USDC",               usdValue: "$1,500" },
  { daysAgo: 22, type: "deposit",  protocol: "Jones DAO",           description: "Deposited into jUSDC auto-yield vault (9.8% APY)",   tokenIn: "USDC",               usdValue: "$3,000", apy: "9.8%",  yieldEarned: "$294/yr" },
];

export function getWalletActivity(chain: string): ChainActivity[] {
  const now = new Date();
  const templates =
    chain === "Ethereum" ? ETH_TEMPLATES
    : chain === "Base"   ? BASE_TEMPLATES
    : ARB_TEMPLATES;

  return templates.map((t, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - t.daysAgo);
    return {
      ...t,
      id: `${chain}-${i}`,
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      chain,
    };
  });
}

export function activityToText(activity: ChainActivity[]): string {
  return activity
    .map((a) => {
      let line = `[${a.date}] ${a.type.toUpperCase()} on ${a.protocol}: ${a.description} — ${a.usdValue}`;
      if (a.apy) line += ` | APY: ${a.apy}`;
      if (a.yieldEarned) line += ` | Yield: ${a.yieldEarned}`;
      return line;
    })
    .join("\n");
}

export function getActiveProtocols(activity: ChainActivity[]): string[] {
  const seen = new Set<string>();
  return activity
    .filter((a) => a.type === "deposit" || a.type === "stake")
    .map((a) => a.protocol)
    .filter((p) => { if (seen.has(p)) return false; seen.add(p); return true; });
}

export function getTotalYield(activity: ChainActivity[]): number {
  return activity
    .filter((a) => a.type === "claim" || a.yieldEarned)
    .reduce((sum, a) => {
      if (a.type !== "claim") return sum;
      const n = parseFloat(a.usdValue.replace(/[$,]/g, ""));
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
}
