import { Zap, Globe, Activity } from "lucide-react";

export const BentoGrid = () => (
  <section className="px-6 py-24 border-t border-white/5">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight mb-16">
        A terminal that knows your environment.
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Card 1 - Large left */}
        <div className="md:col-span-2 md:row-span-2 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-transparent to-primary/5 hover:border-white/20 transition-all hover:scale-[1.01] group">
          <h3 className="text-xl font-semibold mb-2">Natural Language Commands</h3>
          <p className="text-sm text-zinc-400 mb-6">Speak to your terminal like a teammate. Sentio translates intent into safe, reviewable actions.</p>
          <div className="rounded-lg border border-white/10 bg-black/60 p-4 font-mono text-xs space-y-2">
            <div className="text-zinc-500">$ <span className="text-white">sentio</span> "find slow queries in the api and patch them"</div>
            <div className="text-[hsl(190_95%_70%)] terminal-glow">◆ Tracing 4 endpoints...</div>
            <div className="text-emerald-400">✓ /users/feed — 1.2s → 180ms</div>
            <div className="text-emerald-400">✓ /search — N+1 query eliminated</div>
            <div className="text-zinc-300">→ Opening PR #482 <span className="animate-pulse">▊</span></div>
          </div>
        </div>

        {/* Card 2 - Tall right */}
        <div className="md:row-span-2 p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-white/20 transition-all hover:scale-[1.01]">
          <Zap className="h-5 w-5 text-[hsl(190_95%_70%)] mb-4" style={{ filter: "drop-shadow(0 0 8px hsl(190 95% 70% / 0.6))" }} />
          <h3 className="text-xl font-semibold mb-2">Zero Configuration</h3>
          <p className="text-sm text-zinc-400 mb-6">Install in seconds. No runtime, no env files, no headache.</p>
          <div className="space-y-3">
            {["Download installer", "Run sentio login", "Authorize in browser", "Ready to go"].map((step, i) => (
              <div key={step} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                <div className="h-6 w-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-mono text-[hsl(190_95%_70%)]">{i + 1}</div>
                <span className="text-sm text-zinc-300">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3 - Wide bottom */}
        <div className="md:col-span-3 p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-transparent to-white/[0.04] hover:border-white/20 transition-all hover:scale-[1.005]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="md:max-w-sm">
              <Globe className="h-5 w-5 text-[hsl(190_95%_70%)] mb-3" style={{ filter: "drop-shadow(0 0 8px hsl(190 95% 70% / 0.6))" }} />
              <h3 className="text-xl font-semibold mb-2">Cross-platform Sync</h3>
              <p className="text-sm text-zinc-400">Your context, history, and preferences follow you across machines.</p>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-3">
              {[
                { label: "Devices", value: "3" },
                { label: "Sessions", value: "1.2k" },
                { label: "Tasks/wk", value: "248" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mb-1"><Activity className="h-3 w-3" />{s.label}</div>
                  <div className="text-2xl font-semibold">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);