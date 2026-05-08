import { useState, useEffect } from "react";
import { Eye, EyeOff, Github, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser, loginWithGithub, saveToken, saveUser } from "@/lib/authService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "signin" | "signup";

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [tab, setTab] = useState<Tab>("signin");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [signinForm, setSigninForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "" });

  useEffect(() => {
    if (!isOpen) {
      setError("");
      setSuccess("");
      setLoading(false);
    }
  }, [isOpen]);

  const switchTab = (t: Tab) => {
    setTab(t);
    setError("");
    setSuccess("");
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!signinForm.email || !signinForm.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(signinForm.email, signinForm.password);
      saveToken(data.token);
      saveUser(data.user);
      setSuccess(`Welcome back, ${data.user.name}!`);
      setTimeout(() => onClose(), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (signupForm.password !== signupForm.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(signupForm.name, signupForm.email, signupForm.password);
      saveToken(data.token);
      saveUser(data.user);
      setSuccess(`Account created! Welcome, ${data.user.name}!`);
      setTimeout(() => onClose(), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
        <DialogContent aria-describedby={undefined} className="sm:max-w-[440px] bg-transparent border-none p-0 shadow-none focus:outline-none focus-visible:outline-none">
          <DialogTitle className="sr-only">Log in to Sentio</DialogTitle>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full relative"
              >
                

                {/* Glass Card */}
                <div className="relative rounded-3xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-3xl p-8 shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <Logo size={40} className="scale-110" />
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex rounded-lg border border-white/10 bg-black/30 p-1 mb-6">
                    <button
                      type="button"
                      onClick={() => switchTab("signin")}
                      className={`flex-1 h-9 rounded-md text-sm font-medium transition-all ${tab === "signin" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab("signup")}
                      className={`flex-1 h-9 rounded-md text-sm font-medium transition-all ${tab === "signup" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Error / Success */}
                  {error && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                      {success}
                    </div>
                  )}

                  {/* Sign In Form */}
                  {tab === "signin" && (
                    <form className="space-y-4" onSubmit={handleSignin}>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          value={signinForm.email}
                          onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Password</label>
                        <div className="relative">
                          <input
                            type={showPwd ? "text" : "password"}
                            placeholder="••••••••"
                            value={signinForm.password}
                            onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                            className="w-full h-12 px-4 pr-12 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPwd((s) => !s)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                          >
                            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-end text-xs">
                        <a href="#" className="text-zinc-400 hover:text-white transition-colors font-medium">Forgot password?</a>
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                      >
                        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : "Sign in"}
                      </Button>
                    </form>
                  )}

                  {/* Sign Up Form */}
                  {tab === "signup" && (
                    <form className="space-y-4" onSubmit={handleSignup}>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Password</label>
                        <div className="relative">
                          <input
                            type={showPwd ? "text" : "password"}
                            placeholder="Min. 6 characters"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            className="w-full h-12 px-4 pr-12 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPwd((s) => !s)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                          >
                            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={signupForm.confirm}
                          onChange={(e) => setSignupForm({ ...signupForm, confirm: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-200"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                      >
                        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</> : "Create account"}
                      </Button>
                    </form>
                  )}

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold">
                      <span className="px-4 bg-[#0A0A0A] text-zinc-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      disabled
                      title="Coming soon"
                      className="h-12 rounded-xl border border-white/10 bg-white/[0.02] transition-all flex items-center justify-center gap-3 text-xs font-bold text-white opacity-40 cursor-not-allowed"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </button>
                    <button
                      type="button"
                      disabled
                      title="Coming soon"
                      className="h-12 rounded-xl border border-white/10 bg-white/[0.02] transition-all flex items-center justify-center gap-3 text-xs font-bold text-white opacity-40 cursor-not-allowed"
                    >
                      <GoogleIcon /> Google
                    </button>
                  </div>

                  <p className="mt-6 text-center text-xs text-zinc-500">
                    {tab === "signin" ? (
                      <>Don't have an account?{" "}<button type="button" onClick={() => switchTab("signup")} className="text-white hover:underline underline-offset-4 font-bold">Sign up</button></>
                    ) : (
                      <>Already have an account?{" "}<button type="button" onClick={() => switchTab("signin")} className="text-white hover:underline underline-offset-4 font-bold">Sign in</button></>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4">
    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.5 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" />
  </svg>
);
