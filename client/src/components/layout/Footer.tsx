import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="relative border-t border-white/5 bg-[#050505] pt-24 pb-12 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] ambient-blur opacity-20 pointer-events-none" />
    
    <div className="relative w-full px-6 sm:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <Logo size={28} />
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Empowering developers with agentic AI directly in their terminal. Build faster, smarter, and together.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Resources</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/docs" className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-1">
                Documentation <ArrowUpRight size={12} />
              </Link>
            </li>
            <li>
              <a href="#how-to-use" className="text-zinc-500 hover:text-primary transition-colors">How it works</a>
            </li>
            <li>
              <a href="#features" className="text-zinc-500 hover:text-primary transition-colors">Core Features</a>
            </li>
          </ul>
        </div>

        {/* Social/Contact Column */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Connect</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a 
                href="https://github.com/rajesh-kayal-dev/sentio-cli.git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
              >
                <Github size={16} /> GitHub
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/in/rajesh110/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
            <li>
              <a 
                href="mailto:rajeshkayal8001@gmail.com" 
                className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail size={16} /> Email Support
              </a>
            </li>
          </ul>
        </div>

        {/* Developer Column */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Developer</h4>
          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-xs text-zinc-500 mb-2">Designed & Built by</p>
            <p className="text-sm font-bold text-white">Rajesh Kayal</p>
            <p className="text-[10px] text-primary font-mono mt-1">@rajesh-kayal-dev</p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] text-zinc-600 font-medium">
        <div className="flex items-center gap-8">
          <p>© 2026 Sentio Systems Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          All Systems Operational
        </div>
      </div>
    </div>
  </footer>
);