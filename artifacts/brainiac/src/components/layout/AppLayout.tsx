import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Brain, LayoutDashboard, Zap, Wallet, MessageSquare, ChevronRight, Settings, X, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/feed",      label: "Feed",       icon: Zap },
  { href: "/wallet",   label: "Wallets",     icon: Wallet },
  { href: "/brain",    label: "Brain",       icon: MessageSquare },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex">

      {/* ── Desktop sidebar ─────────────────────────────────────────── */}
      <aside className="hidden md:flex w-56 fixed inset-y-0 left-0 border-r border-border bg-sidebar flex-col z-20">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight tracking-tight">Brainiac</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Web3 Second Brain</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors text-left">
            <Avatar className="w-9 h-9 border border-border">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-400 text-primary-foreground">
                GS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate text-foreground">Giwa Sheedah</div>
              <div className="text-xs text-muted-foreground truncate">Free plan</div>
            </div>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ───────────────────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-sidebar border-b border-border flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-base tracking-tight">Brainiac</span>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute right-0 top-0 bottom-0 w-64 bg-sidebar border-l border-border flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-display font-bold text-foreground">Menu</span>
              <button onClick={() => setDrawerOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 p-2 rounded-xl">
                <Avatar className="w-9 h-9 border border-border">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-400 text-primary-foreground">
                    GS
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate text-foreground">Giwa Sheedah</div>
                  <div className="text-xs text-muted-foreground truncate">Free plan</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ── Mobile bottom nav ─────────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 h-16 bg-sidebar border-t border-border flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="flex-1 md:ml-56 pt-14 md:pt-0 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
