import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import logo from "@/assets/sentio-logo.png";
import { loginUser, registerUser, loginWithGithub, saveToken, saveUser } from "@/lib/authService";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4">
    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.5 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4C17 4.6 18 4.9 18 4.9c.6 1.7.2 2.9.1 3.2.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);

type Tab = "signin" | "signup";

const GITHUB_ERRORS: Record<string, string> = {
  github_no_code: "GitHub login was cancelled.",
  github_token_failed: "Failed to get token from GitHub. Please try again.",
  github_no_email: "No verified email found on your GitHub account.",
  github_auth_failed: "GitHub authentication failed. Please try again.",
};

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tab, setTab] = useState<Tab>("signin");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [signinForm, setSigninForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "" });

  useEffect(() => {
    const token = searchParams.get("token");
    const userRaw = searchParams.get("user");
    const oauthError = searchParams.get("error");

    if (token && userRaw) {
      try {
        const user = JSON.parse(decodeURIComponent(userRaw));
        saveToken(token);
        saveUser(user);
        setSuccess(`Welcome, ${user.name}! Redirecting...`);
        setTimeout(() => navigate("/"), 1200);
      } catch {
        setError("Invalid GitHub response. Please try again.");
      }
    }

    if (oauthError) {
      setError(GITHUB_ERRORS[oauthError] || "An unknown error occurred.");
    }
  }, [searchParams, navigate]);

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
      setTimeout(() => navigate("/"), 1200);
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
      setTimeout(() => navigate("/"), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[hsl(190_95%_70%/0.08)] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(230_90%_60%/0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <img src={logo} alt="Sentio" className="h-7 w-7 object-contain drop-shadow-[0_0_10px_hsl(190_95%_70%/0.4)]" />
              <span className="font-mono"><span className="text-[hsl(190_95%_70%)]">&gt;_</span> Sentio</span>
            </Link>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-lg border border-white/10 bg-black/30 p-1 mb-8">
            <button
              onClick={() => { setTab("signin"); setError(""); setSuccess(""); }}
              className={`flex-1 h-9 rounded-md text-sm font-medium transition-all ${tab === "signin" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("signup"); setError(""); setSuccess(""); }}
              className={`flex-1 h-9 rounded-md text-sm font-medium transition-all ${tab === "signup" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback */}
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
              <div>
                <label className="block text-xs text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={signinForm.email}
                  onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={signinForm.password}
                    onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                    className="w-full h-11 px-3.5 pr-10 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-zinc-400 cursor-pointer select-none">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-black/40 accent-white" />
                  Remember me
                </label>
                <a href="#" className="text-zinc-300 hover:text-white transition-colors">Forgot password?</a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : "Sign in"}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {tab === "signup" && (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="block text-xs text-zinc-400 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="w-full h-11 px-3.5 pr-10 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signupForm.confirm}
                  onChange={(e) => setSignupForm({ ...signupForm, confirm: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/60 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</> : "Create account"}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#0A0A0A] text-zinc-500">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={loginWithGithub}
              className="h-11 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <GithubIcon /> GitHub
            </button>
            <button
              className="h-11 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm font-medium opacity-50 cursor-not-allowed"
              title="Coming soon"
              disabled
            >
              <GoogleIcon /> Google
            </button>
          </div>

        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {tab === "signin" ? (
            <>Don't have an account?{" "}<button onClick={() => setTab("signup")} className="text-white hover:underline">Sign up</button></>
          ) : (
            <>Already have an account?{" "}<button onClick={() => setTab("signin")} className="text-white hover:underline">Sign in</button></>
          )}
        </p>
      </div>
    </main>
  );
};

export default Login;