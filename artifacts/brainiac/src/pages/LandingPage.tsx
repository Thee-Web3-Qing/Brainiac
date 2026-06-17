import { Link } from "wouter";
import { Brain, Zap, Wallet, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-[#0A0E1A] text-foreground font-sans selection:bg-primary/30">

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <span className="font-display font-bold text-lg md:text-xl tracking-tight">Brainiac</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Sign in
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-4 md:px-5 text-sm">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-20 md:pb-24">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6 md:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Powered by Qwen AI · Built on 0G Storage
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-5 md:mb-6 leading-[1.1]">
            Your Web3 world,{" "}
            <br className="hidden md:block" />
            <span className="gradient-text">finally organized.</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
            Brainiac pulls signal from your Discord servers and Telegram groups, remembers your on-chain activity, and helps you create content — all in one AI-powered dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                Start for free →
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 text-base border-white/10 hover:bg-white/5">
              See how it works
            </Button>
          </div>
        </section>

        {/* Dashboard Preview Mockup */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 mt-16 md:mt-20 animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <div className="rounded-xl md:rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/10">
            {/* Fake browser bar */}
            <div className="h-9 md:h-10 border-b border-white/5 bg-black/40 flex items-center px-3 md:px-4 gap-3 md:gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="flex-1 max-w-xs mx-auto bg-white/5 rounded-md h-5 md:h-6 flex items-center justify-center text-[9px] md:text-[10px] text-white/40 font-mono">
                app.brainiac.xyz/dashboard
              </div>
            </div>
            {/* Fake app content */}
            <div className="flex h-48 sm:h-64 md:h-[400px]">
              {/* Sidebar — hidden on mobile */}
              <div className="hidden sm:flex w-36 md:w-48 border-r border-white/5 bg-black/20 p-3 md:p-4 flex-col gap-2">
                <div className="h-7 md:h-8 rounded bg-primary/20 flex items-center px-3 mb-3 md:mb-4">
                  <span className="w-16 md:w-20 h-2 bg-primary rounded" />
                </div>
                <div className="h-7 md:h-8 rounded bg-white/5 flex items-center px-3"><span className="w-12 md:w-16 h-2 bg-white/20 rounded" /></div>
                <div className="h-7 md:h-8 rounded bg-white/5 flex items-center px-3"><span className="w-16 md:w-24 h-2 bg-white/20 rounded" /></div>
                <div className="h-7 md:h-8 rounded bg-white/5 flex items-center px-3"><span className="w-10 md:w-14 h-2 bg-white/20 rounded" /></div>
              </div>
              <div className="flex-1 p-3 md:p-6 bg-black/10">
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-6">
                  {[
                    { val: "12", color: "text-cyan-400" },
                    { val: "3", color: "text-primary" },
                    { val: "8", color: "text-green-400" },
                  ].map((s, i) => (
                    <div key={i} className="h-14 sm:h-20 md:h-24 rounded-xl bg-white/5 border border-white/5 p-2 md:p-4 flex flex-col justify-between">
                      <span className="w-8 md:w-16 h-1.5 md:h-2 bg-white/20 rounded" />
                      <span className={`text-base md:text-2xl font-bold ${s.color}`}>{s.val}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 md:space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 md:h-16 rounded-xl bg-white/5 border border-white/5 flex items-center px-3 md:px-4 gap-3 md:gap-4">
                      <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-white/10 shrink-0" />
                      <div className="flex-1 space-y-1.5 md:space-y-2">
                        <div className="w-24 md:w-32 h-1.5 md:h-2 bg-white/20 rounded" />
                        <div className="w-3/4 h-1.5 md:h-2 bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20 md:mt-32">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {[
              { icon: <Zap className="w-6 h-6 text-cyan-400" />, bg: "bg-cyan-500/10", title: "Feed Intelligence", desc: "Connect your Discord servers and Telegram groups. We filter the noise and highlight the alpha you actually care about." },
              { icon: <Wallet className="w-6 h-6 text-indigo-400" />, bg: "bg-indigo-500/10", title: "Wallet Memory", desc: "Track your wallets across chains. We remember your positions so you don't have to keep checking explorers." },
              { icon: <MessageSquare className="w-6 h-6 text-purple-400" />, bg: "bg-purple-500/10", title: "Content Brain", desc: "Generate high-quality threads, recaps, and updates using your personal feed history as context." },
            ].map((f) => (
              <div key={f.title} className="p-5 md:p-6 rounded-2xl bg-card border border-border">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 md:mb-6`}>
                  {f.icon}
                </div>
                <h3 className="text-lg md:text-xl font-display font-semibold text-white mb-2 md:mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20 md:mt-32">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-sm md:text-base">Start for free, upgrade when you need more power.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free", price: "$0", period: "/forever",
                features: ["1 wallet", "2 communities", "7-day history", "5 AI drafts/month"],
                cta: <Button variant="outline" className="w-full">Get Started</Button>,
                highlight: false,
              },
              {
                name: "Pro", price: "$15", period: "/month",
                features: ["3 wallets", "Unlimited communities", "90-day history", "Unlimited AI drafts"],
                cta: <Button className="w-full bg-primary hover:bg-primary/90 text-white">Upgrade to Pro</Button>,
                highlight: true,
              },
              {
                name: "Builder", price: "$39", period: "/month",
                features: ["Unlimited wallets", "Unlimited communities", "Full history", "API access + Team sharing"],
                cta: <Button variant="outline" className="w-full">Contact Sales</Button>,
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-6 md:p-8 rounded-2xl bg-card border relative ${
                  plan.highlight ? "border-primary/50 glow-indigo md:-translate-y-4" : "border-border"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-cyan-400 rounded-t-2xl" />
                )}
                <div className={`text-base md:text-lg font-medium mb-2 ${plan.highlight ? "text-primary" : "text-white"}`}>{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-5 md:mb-6">
                  <span className="text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-sm text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.cta}
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 bg-black/40 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-white">Brainiac</span>
          </div>
          <div className="text-sm text-muted-foreground">© 2026 Brainiac. Built on 0G.</div>
        </div>
      </footer>
    </div>
  );
}
