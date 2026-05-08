import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export const CodeBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="group relative my-6 rounded-lg border border-[#333] bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#222] bg-[#111]">
        <div className="flex items-center gap-2 text-xs text-[#888] font-mono">
          <Terminal className="h-3.5 w-3.5" /> bash
        </div>
        <button
          onClick={copy}
          className="text-[#888] hover:text-white transition-colors"
          aria-label="Copy"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="px-4 py-4 font-mono text-[13px] leading-6 text-[#EDEDED] overflow-x-auto">
        {children.split("\n").map((line, i) => (
          <div key={i} className={line.startsWith("#") ? "text-[#666]" : ""}>
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
};
