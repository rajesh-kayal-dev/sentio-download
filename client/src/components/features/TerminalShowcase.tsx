import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Line = { type: "out" | "ok" | "info" | "muted" | "err" | "ascii" | "prompt"; text: string };

type Scene = {
  cmd: string;
  lines: Line[];
};

const ASCII = `   ____             _   _      
  / ___|  ___ _ __ | |_(_) ___ 
  \\___ \\ / _ \\ '_ \\| __| |/ _ \\
   ___) |  __/ | | | |_| | (_) |
  |____/ \\___|_| |_|\\__|_|\\___/`;

const SCENES: Scene[] = [
  {
    cmd: "sentio",
    lines: [
      { type: "ascii", text: ASCII },
      { type: "info", text: "  ✦ A premium CLI-based AI tool for developers" },
      { type: "muted", text: "" },
      { type: "muted", text: "  Run `sentio --help` to see available commands." },
    ],
  },
  {
    cmd: "sentio --v",
    lines: [
      { type: "ok", text: "sentio v1.0.0" },
      { type: "muted", text: "build: 2026.05 · runtime: standalone · platform: win32-x64" },
    ],
  },
  {
    cmd: "sentio --help",
    lines: [
      { type: "info", text: "USAGE" },
      { type: "muted", text: "  $ sentio <command> [flags]" },
      { type: "muted", text: "" },
      { type: "info", text: "COMMANDS" },
      { type: "out", text: "  login      Authenticate your device" },
      { type: "out", text: "  wakeup     Boot the agent in this workspace" },
      { type: "out", text: "  chat       Talk to the AI in your terminal" },
      { type: "out", text: "  agent      Run an autonomous task" },
    ],
  },
  {
    cmd: "sentio login",
    lines: [
      { type: "info", text: "◆ Opening browser for authorization..." },
      { type: "muted", text: "  device code: SENTIO-9F2A-71X" },
      { type: "ok", text: "✓ Authorized as rajesh@sentio.dev" },
      { type: "ok", text: "✓ Token stored securely in keychain" },
    ],
  },
  {
    cmd: "sentio start",
    lines: [
      { type: "info", text: "◇ injected env (9) from server\\.env  // tip: ⌘ multiple files { path: ['.env.local', '.env'] }" },
      { type: "ascii", text: ASCII },
      { type: "info", text: "  ✦ A premium CLI-based AI tool for developers" },
      { type: "muted", text: "" },
      { type: "ok", text: "Welcome back, Rajesh!" },
      { type: "muted", text: "" },
      { type: "info", text: "◆ Select an option:" },
      { type: "muted", text: "    Chat" },
      { type: "ok", text: "  ✓ Welcome back, Rajesh!" },
      { type: "ok", text: "  ✓ Conversation loaded" },
      { type: "muted", text: "" },
      { type: "info", text: "  ⌬ Session Info" },
      { type: "out", text: "    Session: New chat conversation" },
      { type: "out", text: "    Mode: chat" },
    ],
  },
];

const colorFor = (t: Line["type"]) => {
  switch (t) {
    case "ok": return "text-emerald-400";
    case "info": return "text-[hsl(190_95%_70%)] terminal-glow";
    case "err": return "text-rose-400";
    case "muted": return "text-zinc-500";
    case "ascii": return "text-[hsl(190_95%_70%)] terminal-glow";
    case "prompt": return "text-white";
    default: return "text-zinc-300";
  }
};

function useTypewriter(text: string, speed = 32, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) { setOut(""); return; }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

const Scene = ({ scene, onDone }: { scene: Scene; onDone: () => void }) => {
  const typed = useTypewriter(scene.cmd, 55);
  const cmdDone = typed === scene.cmd;
  const [revealCount, setRevealCount] = useState(0);

  useEffect(() => {
    if (!cmdDone) { setRevealCount(0); return; }
    if (revealCount >= scene.lines.length) {
      const t = setTimeout(onDone, 2200);
      return () => clearTimeout(t);
    }
    const delay = scene.lines[revealCount].type === "ascii" ? 120 : 180;
    const t = setTimeout(() => setRevealCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [cmdDone, revealCount, scene.lines, onDone]);

  return (
    <div className="font-mono text-[13px] leading-relaxed">
      <div className="flex">
        <span className="text-[hsl(190_95%_70%)] mr-2">PS D:\AI Projects\sentio-cli&gt;</span>
        <span className="text-white">{typed}</span>
        {!cmdDone && <span className="ml-0.5 inline-block w-2 h-4 bg-white/80 animate-pulse" />}
      </div>
      <div className="mt-2 space-y-0.5">
        {scene.lines.slice(0, revealCount).map((l, i) => (
          <motion.pre
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`whitespace-pre font-mono ${colorFor(l.type)}`}
          >
            {l.text || " "}
          </motion.pre>
        ))}
        {cmdDone && revealCount >= scene.lines.length && (
          <div className="flex items-center text-zinc-500 pt-2">
            <span className="text-[hsl(190_95%_70%)] mr-2">PS&gt;</span>
            <span className="inline-block w-2 h-4 bg-white/80 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export const TerminalShowcase = () => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % SCENES.length);

  return (
    <section className="relative px-6 pb-24">
      <div className="absolute inset-0 top-1/4 h-1/2 ambient-blur opacity-60 pointer-events-none" />
      <div className="relative container mx-auto max-w-5xl">
        {/* Glow border wrapper */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[hsl(190_95%_70%/0.5)] via-[hsl(230_90%_60%/0.2)] to-transparent">
          <div className="rounded-2xl border border-white/10 bg-[hsl(0_0%_3%)] overflow-hidden shadow-[0_30px_120px_-20px_hsl(230_90%_60%/0.5)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-4 text-xs text-zinc-500 font-mono">PowerShell — sentio-cli</span>
              <div className="ml-auto flex gap-1.5">
                {SCENES.map((s, i) => (
                  <button
                    key={s.cmd}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 w-6 rounded-full transition-all ${i === idx ? "bg-[hsl(190_95%_70%)] shadow-[0_0_8px_hsl(190_95%_70%)]" : "bg-white/10 hover:bg-white/20"}`}
                    aria-label={s.cmd}
                  />
                ))}
              </div>
            </div>
            <div className="p-6 min-h-[420px] bg-[radial-gradient(ellipse_at_top,hsl(230_90%_60%/0.08),transparent_60%)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Scene scene={SCENES[idx]} onDone={next} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Command pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {SCENES.map((s, i) => (
            <button
              key={s.cmd}
              onClick={() => setIdx(i)}
              className={`group font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${i === idx
                  ? "border-[hsl(190_95%_70%)]/60 bg-[hsl(190_95%_70%)]/10 text-white shadow-[0_0_20px_hsl(190_95%_70%/0.25)]"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
            >
              <span className="text-[hsl(190_95%_70%)] mr-1.5">$</span>{s.cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};