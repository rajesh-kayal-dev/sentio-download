import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Monitor, Apple, Terminal } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLATFORMS = [
  {
    id: "windows",
    name: "Windows",
    filename: "Sentio_Setup_Pro.exe",
    icon: Monitor,
    description: "Full .exe installer for Windows 10/11"
  },
  {
    id: "macos",
    name: "macOS",
    filename: "sentio-macos",
    icon: Apple,
    description: "Universal binary for Intel & M1/M2"
  },
  {
    id: "linux",
    name: "Linux",
    filename: "sentio-linux",
    icon: Terminal,
    description: "Native x64 binary for Linux distros"
  }
];

export const DownloadModal = ({ isOpen, onClose }: DownloadModalProps) => {
  const startDownload = (filename: string, name: string) => {
    toast.success(`Starting download: ${name}`, {
      description: "Your setup file will appear in your downloads folder.",
      duration: 3000,
    });

    const link = document.createElement("a");
    link.href = `/download/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal after a short delay
    setTimeout(onClose, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[460px] bg-[#0A0A0A] border-white/10 text-white overflow-hidden p-0">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-2xl font-bold tracking-tight">Get Sentio CLI</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Select your operating system to download the standalone installer.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            {PLATFORMS.map((platform, i) => (
              <motion.button
                key={platform.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => startDownload(platform.filename, platform.name)}
                className="group relative flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all text-left w-full"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  <platform.icon className="h-5 w-5 text-zinc-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-white block">{platform.name}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{platform.description}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <Download className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
            Signed & Secured Binaries
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
