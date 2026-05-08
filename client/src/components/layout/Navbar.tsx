import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { LoginModal } from "@/components/auth/LoginModal";
import { isLoggedIn, getUser, removeAuth } from "@/lib/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DownloadModal } from "../features/DownloadModal";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      setAuthenticated(loggedIn);
      if (loggedIn) {
        setUser(getUser());
      } else {
        setUser(null);
      }
    };

    checkAuth();
    // Listen for storage changes to sync auth state across tabs
    window.addEventListener("storage", checkAuth);
    // Custom event for same-tab updates
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

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/5"
    >
      <nav className="w-full flex items-center justify-between h-16 px-6 sm:px-12">
        <Logo size={28} className="text-lg" />

        <div className="flex items-center gap-6">
          <Link to="/docs" className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors">Documentation</Link>

          {!authenticated ? (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Log in
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

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDownloadOpen(true)}
            className="border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-full px-4"
          >
            Download
          </Button>
        </div>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => {
        setIsLoginOpen(false);
        // Sync auth state after modal closes in case login happened
        const loggedIn = isLoggedIn();
        setAuthenticated(loggedIn);
        if (loggedIn) setUser(getUser());
      }} />
      <DownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </motion.header>
  );
};