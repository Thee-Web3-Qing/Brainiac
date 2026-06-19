import { useState } from "react";
import { Check, Copy, Wallet, Zap, Shield, RefreshCw, ExternalLink, X } from "lucide-react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Link } from "wouter";

const PRO_FEATURES = [
  "Unlimited AI drafts and chat",
  "Cross-device Telegram session sync",
  "Priority Qwen reasoning on your feed",
  "Advanced wallet activity analysis",
  "Export your Brainiac wallet recovery phrase",
  "Early access to new features",
];

const FREE_LIMITS = [
  "15 AI drafts/month",
  "Single device only",
  "Standard feed processing",
  "Basic wallet summaries",
];

const PAYMENT_WALLET = "0x9914C8de5CdA23928B67B41F5E19ad7B73A3f886";
const MONTHLY_ETH = "0.003";
const ANNUAL_ETH  = "0.027";
const MONTHLY_USD = "$9";
const ANNUAL_USD  = "$79";

type Plan = "monthly" | "annual";

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      {label ?? (copied ? "Copied" : "Copy")}
    </button>
  );
}

function PayModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const { authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const [txHash, setTxHash] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = plan === "monthly" ? MONTHLY_ETH : ANNUAL_ETH;
  const label  = plan === "monthly" ? "1 month" : "1 year";

  const sendFromWallet = async () => {
    if (!authenticated) { login(); return; }
    const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");
    if (!embeddedWallet) {
      setError("No Brainiac embedded wallet found. Make sure you're signed in.");
      return;
    }
    setSending(true); setError(null);
    try {
      const provider = await embeddedWallet.getEthereumProvider();
      const amountHex = "0x" + Math.round(parseFloat(amount) * 1e18).toString(16);
      const hash = await provider.request({
        method: "eth_sendTransaction",
        params: [{ from: embeddedWallet.address, to: PAYMENT_WALLET, value: amountHex }],
      }) as string;
      setTxHash(hash);
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Transaction failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-card border border-border rounded-t-2xl sm:rounded-2xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-display font-semibold text-foreground">Pay with crypto</h3>
            <p className="text-muted-foreground text-xs mt-0.5">Wallet-to-wallet · {label} · {amount} ETH</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto">
                <Check size={22} className="text-green-400" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">Payment sent</p>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                  Your Pro access will activate once the transaction confirms on-chain.
                </p>
              </div>
              {txHash && (
                <div className="bg-background border border-border rounded-xl p-3 text-left">
                  <p className="text-muted-foreground/60 text-xs mb-1.5">Transaction hash</p>
                  <div className="flex items-center gap-2">
                    <code className="text-foreground text-xs font-mono truncate flex-1">{txHash.slice(0, 20)}...{txHash.slice(-8)}</code>
                    <CopyButton value={txHash} />
                    <a href={`https://chainscan-newton.0g.ai/tx/${txHash}`} target="_blank" rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}
              <button onClick={onClose}
                className="w-full py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/25 text-primary text-sm font-medium rounded-xl transition-colors">
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="bg-background border border-border rounded-xl p-4 space-y-3">
                <div>
                  <p className="text-muted-foreground/60 text-xs mb-1">Send to</p>
                  <div className="flex items-center gap-2">
                    <code className="text-foreground text-xs font-mono truncate flex-1">{PAYMENT_WALLET}</code>
                    <CopyButton value={PAYMENT_WALLET} />
                  </div>
                </div>
                <div className="border-t border-border/50 pt-3">
                  <p className="text-muted-foreground/60 text-xs mb-1">Amount</p>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-semibold">{amount} ETH</span>
                    <CopyButton value={amount} label="Copy amount" />
                  </div>
                </div>
              </div>

              <button
                onClick={sendFromWallet}
                disabled={sending}
                className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {sending
                  ? <><RefreshCw size={14} className="animate-spin" /> Sending...</>
                  : <><Wallet size={14} /> Send from my Brainiac wallet</>}
              </button>

              {error && <p className="text-red-400 text-xs text-center">{error}</p>}

              <p className="text-muted-foreground/50 text-xs text-center leading-relaxed">
                Or send manually from any wallet to the address above. Your session string and messages are never on our servers — only you hold the keys.
              </p>

              <div className="space-y-1.5">
                <p className="text-muted-foreground/60 text-xs">Already sent? Paste your tx hash:</p>
                <div className="flex gap-2">
                  <input
                    type="text" placeholder="0x..." value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-foreground text-xs font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50"
                  />
                  <button
                    onClick={() => setSent(true)}
                    disabled={!txHash.trim()}
                    className="px-3 py-2 bg-card border border-border hover:border-primary/40 rounded-xl text-muted-foreground hover:text-foreground text-xs transition-colors disabled:opacity-40"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("annual");
  const [showPayModal, setShowPayModal] = useState(false);
  const { authenticated, login } = usePrivy();

  const handleUpgrade = () => {
    if (!authenticated) { login(); return; }
    setShowPayModal(true);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto animate-fade-in">
      {showPayModal && (
        <PayModal plan={selectedPlan} onClose={() => setShowPayModal(false)} />
      )}

      <div className="mb-6">
        <Link href="/dashboard">
          <button className="text-muted-foreground text-xs hover:text-foreground transition-colors mb-4 block">
            ← Back to dashboard
          </button>
        </Link>
        <h1 className="font-display font-bold text-foreground text-xl md:text-2xl">Upgrade to Pro</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Pay wallet-to-wallet — no cards, no KYC, no middleman.</p>
      </div>

      {/* Plan selector */}
      <div className="flex gap-2 mb-6 bg-card border border-border rounded-xl p-1 w-full sm:w-auto sm:inline-flex">
        {(["monthly", "annual"] as const).map((p) => (
          <button key={p} onClick={() => setSelectedPlan(p)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              selectedPlan === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}>
            {p === "monthly" ? "Monthly" : "Annual"}
            {p === "annual" && (
              <span className="text-[10px] bg-green-500/15 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full font-semibold">Save 25%</span>
            )}
          </button>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Free */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-3">Free</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="font-display font-bold text-3xl text-foreground">$0</span>
            <span className="text-muted-foreground text-sm mb-1">/forever</span>
          </div>
          <ul className="space-y-2">
            {FREE_LIMITS.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-border mt-0.5">•</span> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="bg-card border border-primary/40 rounded-2xl p-5 relative">
          <div className="absolute top-4 right-4 text-[10px] bg-primary/15 text-primary border border-primary/25 px-2 py-0.5 rounded-full font-semibold">
            Pro
          </div>
          <p className="text-primary text-xs font-semibold uppercase tracking-wide mb-3">Pro</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="font-display font-bold text-3xl text-foreground">
              {selectedPlan === "monthly" ? MONTHLY_USD : ANNUAL_USD}
            </span>
            <span className="text-muted-foreground text-sm mb-1">
              /{selectedPlan === "monthly" ? "mo" : "yr"}
            </span>
          </div>
          <ul className="space-y-2 mb-5">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                <Check size={13} className="text-primary shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
          <button onClick={handleUpgrade}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
            <Zap size={14} />
            Pay {selectedPlan === "monthly" ? `${MONTHLY_ETH} ETH/mo` : `${ANNUAL_ETH} ETH/yr`} with crypto
          </button>
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
        <Shield size={16} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-foreground text-xs font-medium mb-1">Wallet-to-wallet, fully self-custodied</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Payments go directly from your Brainiac embedded wallet to ours — no payment processor, no card data, no intermediary. Your Telegram sessions and Discord tokens are stored only in your browser and never on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
