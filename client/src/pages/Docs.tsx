import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  ChevronRight, 
  Terminal, 
  BookOpen, 
  Download, 
  Zap, 
  Command, 
  Shield, 
  Cpu, 
  LifeBuoy,
  Menu,
  X,
  MessageSquare,
  Wrench,
  Bot,
  Globe,
  Code2,
  FileSearch,
  Settings,
  ArrowRight,
  Monitor,
  Apple
} from "lucide-react";
import logo from "@/assets/sentio-logo.png";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { toast } from "sonner";
import { LoginModal } from "@/components/auth/LoginModal";
import { isLoggedIn, getUser, removeAuth } from "@/lib/authService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PageId = "overview" | "installation" | "quick-start" | "chat" | "tool-calling" | "agentic-mode" | "commands" | "support";

const nav = [
  {
    title: "Introduction",
    items: [
      { label: "Overview", id: "overview", icon: BookOpen },
      { label: "Installation", id: "installation", icon: Download },
      { label: "Quick Start", id: "quick-start", icon: Zap },
    ],
  },
  {
    title: "Features",
    items: [
      { label: "Interactive Chat", id: "chat", icon: MessageSquare },
      { label: "Tool Calling", id: "tool-calling", icon: Wrench },
      { label: "Agentic Mode", id: "agentic-mode", icon: Bot },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Command List", id: "commands", icon: Command },
      { label: "Support", id: "support", icon: LifeBuoy },
    ],
  },
];

const Callout = ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "success" }) => {
  const styles = {
    info: "bg-blue-500/5 border-blue-500/20 text-blue-200",
    warning: "bg-amber-500/5 border-amber-500/20 text-amber-200",
    success: "bg-emerald-500/5 border-emerald-500/20 text-emerald-200",
  };
  
  return (
    <div className={`my-6 p-4 rounded-xl border ${styles[type]} flex gap-3 text-sm leading-6`}>
      <div className="mt-0.5">
        {type === "info" && "💡"}
        {type === "warning" && "⚠️"}
        {type === "success" && "✅"}
      </div>
      <div>{children}</div>
    </div>
  );
};

const Docs = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<PageId>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      setAuthenticated(loggedIn);
      if (loggedIn) setUser(getUser());
      else setUser(null);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    removeAuth();
    setAuthenticated(false);
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  // Sync scroll on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const triggerDownload = (filename: string) => {
    toast.success(`Starting download: ${filename}`);
    const link = document.createElement("a");
    link.href = `/download/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-[#EDEDED] font-sans selection:bg-primary/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="h-full w-full px-6 flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="flex items-center gap-2.5 font-bold text-white tracking-tight">
            <img src={logo} alt="Sentio" className="h-7 w-7 object-contain drop-shadow-[0_0_8px_hsl(190_95%_70%/0.3)]" />
            <span className="hidden sm:inline-block">Sentio CLI</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-lg mx-auto relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Search documentation..."
              className="w-full h-10 pl-11 pr-16 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-primary/30 focus:bg-white/[0.05] transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 border border-white/10 rounded-md px-1.5 py-0.5 font-mono bg-white/[0.02]">
              Ctrl K
            </kbd>
          </div>

          <nav className="ml-auto flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors">Home</Link>
            {!authenticated ? (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-all text-xs font-bold"
              >
                Sign In
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-white/5 text-xs text-white uppercase">
                      {user?.name?.substring(0, 2) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#0A0A0A] border-white/10 text-white" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-zinc-400">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="focus:bg-red-500/10 text-red-400 focus:text-red-400 cursor-pointer gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => {
        setIsLoginOpen(false);
        const loggedIn = isLoggedIn();
        setAuthenticated(loggedIn);
        if (loggedIn) setUser(getUser());
      }} />

      {/* Main Layout */}
      <div className="w-full px-6 sm:px-12 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12">
        
        {/* Left Sidebar */}
        <aside className={`
          fixed md:sticky top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-6 border-r border-white/5 bg-[#050505]
          transition-transform duration-300 md:translate-x-0
          ${isSidebarOpen ? "translate-x-0 w-64 left-0 px-6" : "-translate-x-full md:translate-x-0"}
        `}>
          {nav.map((section) => (
            <div key={section.title} className="mb-10">
              <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-3">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        setCurrentPage(item.id as PageId);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all
                        ${currentPage === item.id 
                          ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"}
                      `}
                    >
                      <item.icon size={16} className={currentPage === item.id ? "text-primary" : "text-zinc-500"} />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="py-12 min-w-0 max-w-[900px] mx-auto w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[13px] text-zinc-500 mb-10">
            <button onClick={() => setCurrentPage("overview")} className="hover:text-zinc-300">Docs</button>
            <ChevronRight size={14} />
            <span className="text-primary font-medium">{currentPage.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
          </div>

          <article className="prose prose-invert prose-zinc max-w-none">
            
            {/* OVERVIEW PAGE */}
            {currentPage === "overview" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <BookOpen size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Introduction</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-8">
                  Sentio CLI
                </h1>
                <p className="text-xl text-zinc-400 leading-relaxed mb-12">
                  The ultimate agentic AI companion for your terminal. Built for speed, security, and developer productivity.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Cpu className="text-primary" size={20} />
                    </div>
                    <h3 className="font-bold mb-2">Native Performance</h3>
                    <p className="text-xs text-zinc-500">Optimized binaries for every system.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="text-primary" size={20} />
                    </div>
                    <h3 className="font-bold mb-2">Secure by Design</h3>
                    <p className="text-xs text-zinc-500">OAuth2 device flow. No local storage of secrets.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Bot className="text-primary" size={20} />
                    </div>
                    <h3 className="font-bold mb-2">Agentic Mindset</h3>
                    <p className="text-xs text-zinc-500">Not just a chatbot, it's a teammate.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setCurrentPage("installation")} className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-all">
                    Get Started
                  </button>
                  <button onClick={() => setCurrentPage("chat")} className="px-6 py-3 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all">
                    Explore Features
                  </button>
                </div>
              </div>
            )}

            {/* INSTALLATION PAGE */}
            {currentPage === "installation" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-extrabold text-white mb-6">Installation</h1>
                <p className="text-zinc-400 mb-10">Download and set up Sentio CLI on your machine in seconds.</p>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-12">
                  <button 
                    onClick={() => triggerDownload("Sentio_Setup_Pro.exe")}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <Monitor className="h-8 w-8 mb-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    <span className="font-bold">Windows</span>
                    <span className="text-[10px] text-zinc-500 mt-1">.exe installer</span>
                  </button>
                  <button 
                    onClick={() => triggerDownload("sentio-macos")}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <Apple className="h-8 w-8 mb-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    <span className="font-bold">macOS</span>
                    <span className="text-[10px] text-zinc-500 mt-1">Universal binary</span>
                  </button>
                  <button 
                    onClick={() => triggerDownload("sentio-linux")}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <Terminal className="h-8 w-8 mb-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    <span className="font-bold">Linux</span>
                    <span className="text-[10px] text-zinc-500 mt-1">x64 binary</span>
                  </button>
                </div>

                <h3 className="text-xl font-bold mb-4">Post-Installation</h3>
                <p className="text-sm text-zinc-400 mb-6">For Mac/Linux, you'll need to give the binary execute permissions:</p>
                <CodeBlock>{`chmod +x sentio-macos
sudo mv sentio-macos /usr/local/bin/sentio`}</CodeBlock>
              </div>
            )}

            {/* QUICK START PAGE */}
            {currentPage === "quick-start" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-extrabold text-white mb-6">Quick Start</h1>
                <p className="text-zinc-400 mb-10">From zero to agent in three simple steps.</p>

                <div className="space-y-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">1</div>
                      <h3 className="text-xl font-bold">Authenticate</h3>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">Run the login command to link your terminal to your Sentio account.</p>
                    <CodeBlock>sentio login</CodeBlock>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">2</div>
                      <h3 className="text-xl font-bold">Start the Session</h3>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">Launch the interactive menu where you can choose your operating mode.</p>
                    <CodeBlock>sentio start</CodeBlock>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">3</div>
                      <h3 className="text-xl font-bold">Select Mode</h3>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">Use your arrow keys to select between Chat, Tool Calling, or Agentic Mode.</p>
                    <Callout type="success">
                      Sentio will automatically detect your local `.env` and configuration files to provide context.
                    </Callout>
                  </div>
                </div>
              </div>
            )}

            {/* CHAT PAGE */}
            {currentPage === "chat" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <MessageSquare size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Core Feature</span>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-6">Interactive Chat</h1>
                <p className="text-xl text-zinc-400 leading-relaxed mb-10">
                  A powerful conversational interface that understands your code and documentation.
                </p>
                
                <h3 className="text-xl font-bold mb-4">How to trigger</h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  Sentio Chat is integrated into the interactive workspace. Run the start command and select <span className="text-primary font-mono font-bold">Chat</span>:
                </p>
                <CodeBlock>sentio start</CodeBlock>
                
                <h3 className="text-xl font-bold mt-12 mb-6">Capabilities</h3>
                <ul className="grid sm:grid-cols-2 gap-6 list-none p-0 mb-12">
                  <li className="p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
                    <h4 className="font-bold mb-2 text-primary">Context Aware</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">Automatically reads relevant files in your workspace to provide accurate answers.</p>
                  </li>
                  <li className="p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
                    <h4 className="font-bold mb-2 text-primary">Explain Code</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">Highlight complex logic and ask Sentio to break it down for you.</p>
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-6">Interactive Example</h3>
                <div className="rounded-2xl border border-white/5 bg-black p-6 font-mono text-sm space-y-4">
                  <div className="flex gap-3">
                    <span className="text-primary">User:</span>
                    <span className="text-zinc-300">How do I implement a secure login flow in this project?</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-emerald-400">Sentio:</span>
                    <span className="text-zinc-400 leading-relaxed">
                      I've analyzed your <code className="text-zinc-300">auth.ts</code>. You should use the <code className="text-zinc-300">verifySession</code> middleware. I can update your routes to include it if you'd like.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL CALLING PAGE */}
            {currentPage === "tool-calling" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Wrench size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Core Feature</span>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-6">Tool Calling</h1>
                <p className="text-xl text-zinc-400 leading-relaxed mb-10">
                  Give the AI extra capabilities to perform real-world actions.
                </p>

                <Callout type="info">
                  Tool calling allows the agent to interact with your system and the internet securely.
                </Callout>

                <h3 className="text-xl font-bold mb-6">Available Tools</h3>
                <div className="space-y-4 mb-12">
                  {[
                    { name: "Google Search", icon: Globe, desc: "Real-time access to the internet for current events and docs." },
                    { name: "Code Execution", icon: Code2, desc: "Run code snippets safely to verify logic or perform math." },
                    { name: "File Analysis", icon: FileSearch, desc: "Scan your directory, read file contents, and analyze structure." },
                    { name: "System Info", icon: Settings, desc: "Understand your OS, hardware, and environment variables." },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <t.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{t.name}</h4>
                        <p className="text-xs text-zinc-500">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-6">Usage Example</h3>
                <div className="rounded-2xl border border-white/5 bg-black p-6 font-mono text-sm space-y-4">
                  <div className="flex gap-3">
                    <span className="text-primary">User:</span>
                    <span className="text-zinc-300">Find the latest version of Tailwind CSS and its migration guide.</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-emerald-400">Sentio:</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 text-[10px] text-zinc-500">
                        <Globe size={10} /> Calling Google Search...
                      </div>
                      <span className="text-zinc-400 leading-relaxed block">
                        The latest version is v3.4. Here's the migration guide: tailwindcss.com/docs/upgrade-guide...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AGENTIC MODE PAGE */}
            {currentPage === "agentic-mode" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Bot size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest">Advanced Feature</span>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-6">Agentic Mode</h1>
                <p className="text-xl text-zinc-400 leading-relaxed mb-10">
                  Autonomous task execution. Let Sentio build entire features for you.
                </p>

                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 mb-10">
                  <h3 className="text-xl font-bold mb-4">Autonomous Scaffolding</h3>
                  <p className="text-zinc-400 text-sm leading-7 mb-6">
                    In Agentic Mode, Sentio doesn't just suggest code; it performs actions. It can create files, install dependencies, and run tests until the task is complete.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-mono text-xs">
                    <span className="animate-pulse">●</span> Processing Task: Create a React login page with Tailwind...
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Common Use Cases</h3>
                <div className="grid gap-4 mb-12">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">Generating boilerplate for new microservices</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">Automating unit test creation for legacy code</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">Refactoring entire directories for better structure</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-6">Project Example</h3>
                <div className="rounded-2xl border border-white/5 bg-black p-6 font-mono text-sm space-y-4">
                  <div className="flex gap-3">
                    <span className="text-primary">User:</span>
                    <span className="text-zinc-300">Create a clean Next.js project with a dark mode toggle.</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-emerald-400">Sentio:</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 text-[10px] text-emerald-400">
                        <Bot size={10} /> Creating workspace...
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 text-[10px] text-zinc-500">
                        <Terminal size={10} /> npx create-next-app@latest . --tailwind --eslint
                      </div>
                      <span className="text-zinc-400 leading-relaxed block">
                        Project created. I'm now implementing the <code className="text-zinc-300">ThemeProvider</code> and toggle component...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COMMANDS PAGE */}
            {currentPage === "commands" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-extrabold text-white mb-6">Command List</h1>
                <div className="rounded-2xl border border-white/5 overflow-hidden mt-8">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white/5 text-zinc-400 font-medium">
                      <tr>
                        <th className="px-6 py-4 border-b border-white/5">Command</th>
                        <th className="px-6 py-4 border-b border-white/5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { cmd: "sentio login", desc: "Authenticate your device" },
                        { cmd: "sentio start", desc: "Launch the interactive menu" },
                        { cmd: "sentio agent", desc: "Run an autonomous agent task" },
                        { cmd: "sentio whoami", desc: "Display session info" },
                        { cmd: "sentio logout", desc: "Remove local credentials" },
                        { cmd: "sentio --version", desc: "Display current version" },
                        { cmd: "sentio --help", desc: "View detailed usage" },
                      ].map((c) => (
                        <tr key={c.cmd} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-mono text-primary text-xs">{c.cmd}</td>
                          <td className="px-6 py-4 text-zinc-400 text-xs">{c.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUPPORT PAGE */}
            {currentPage === "support" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-extrabold text-white mb-6">Support</h1>
                <p className="text-zinc-400 mb-10">We're here to help you get the most out of Sentio.</p>
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20">
                  <p className="text-zinc-300 text-sm mb-6 leading-7">
                    Need help? Our team is available to assist you with any technical issues or feature requests. 
                    Visit our official dashboard to open a support ticket or join our community discord.
                  </p>
                  <a 
                    href="https://sentio-cli.vercel.app" 
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(100,200,255,0.3)]"
                  >
                    Go to Dashboard <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Nav Links */}
            <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center">
              <button 
                onClick={() => {
                  const flatItems = nav.flatMap(n => n.items);
                  const idx = flatItems.findIndex(i => i.id === currentPage);
                  if (idx > 0) setCurrentPage(flatItems[idx - 1].id as PageId);
                }}
                className="text-xs text-zinc-500 hover:text-white transition-colors"
              >
                {currentPage !== "overview" ? "← Previous Page" : ""}
              </button>
              <button 
                onClick={() => {
                  const flatItems = nav.flatMap(n => n.items);
                  const idx = flatItems.findIndex(i => i.id === currentPage);
                  if (idx < flatItems.length - 1) setCurrentPage(flatItems[idx + 1].id as PageId);
                }}
                className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors"
              >
                {currentPage !== "support" ? (
                  <>Next Page <ArrowRight size={14} /></>
                ) : ""}
              </button>
            </div>
          </article>

          {/* Footer */}
          <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-xs pb-10">
            <p>© 2026 Sentio Systems Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400">Terms of Service</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Docs;