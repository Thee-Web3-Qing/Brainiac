import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Brain, LayoutDashboard, Zap, Wallet, MessageSquare, ChevronRight, Settings, X, CreditCard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/feed",      label: "Feed",       icon: Zap },
  { href: "/wallet",   label: "Wallets",     icon: Wallet },
  { href: "/brain",    label: "Brain",       icon: MessageSquare },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex">

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 fixed inset-y-0 left-0 border-r border-border bg-sidebar flex-col z-20">
        <div className="p-5 pb-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg leading-tight tracking-tight">Brainiac</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 mt-3">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 mt-auto border-t border-border">
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left"
          >
            <Avatar className="w-8 h-8 border border-border shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">GS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate text-foreground">Giwa Sheedah</div>
              <div className="text-xs text-muted-foreground">Free plan</div>
            </div>
            <Settings className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-sidebar border-b border-border flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-base tracking-tight">Brainiac</span>
        </Link>
        <button
          onClick={() => setProfileOpen(true)}
          className="flex items-center justify-center"
          aria-label="Profile and settings"
        >
          <Avatar className="w-8 h-8 border border-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">GS</AvatarFallback>
          </Avatar>
        </button>
      </header>

      {/* Profile sheet (shared mobile + desktop) */}
      {profileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setProfileOpen(false)} />
          <aside className="absolute right-0 top-0 bottom-0 w-72 bg-sidebar border-l border-border flex flex-col animate-slide-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="font-display font-semibold text-foreground text-sm">Account</span>
              <button onClick={() => setProfileOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={17} />
              </button>
            </div>

            {/* Profile card */}
            <div className="p-5 border-b border-border">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-11 h-11 border border-border shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">GS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-foreground font-medium text-sm">Giwa Sheedah</p>
                  <p className="text-muted-foreground text-xs">giwa@example.com</p>
                </div>
              </div>
              <div className="bg-background rounded-xl border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Current plan</span>
                  <span className="text-xs font-semibold text-foreground">Free</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: "34%" }} />
                </div>
                <p className="text-muted-foreground/60 text-xs">5 of 15 AI drafts used this month</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 space-y-1">
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-left">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-primary hover:bg-primary/10 transition-colors text-left">
                <CreditCard className="w-4 h-4" /> Upgrade to Pro
              </button>
            </div>

            <div className="mt-auto p-4 border-t border-border">
              <button className="text-muted-foreground/60 hover:text-muted-foreground text-xs transition-colors">
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 h-16 bg-sidebar/95 backdrop-blur-md border-t border-border flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main content */}
      <main className="flex-1 md:ml-56 pt-14 md:pt-0 pb-20 md:pb-0 min-w-0">
        {children}
      </main>
    </div>
  );
}
