import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import logo from "@/assets/sentio-logo.png";
import { useState } from "react";
import { DownloadModal } from "./DownloadModal";
import { motion } from "framer-motion";

const chips = ["> sentio analyze", "> sentio build", "> sentio deploy", "> sentio explain"];

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] ambient-blur pointer-events-none" 
      />
      
      <motion.img
        initial={{ opacity: 0, y: 100, rotate: -5 }}
        animate={{ opacity: 0.05, y: 0, rotate: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        src={logo}
        alt=""
        aria-hidden
        className="absolute top-32 left-1/2 -translate-x-1/2 w-[640px] pointer-events-none select-none"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full px-6 sm:px-12 text-center"
      >
        <motion.img
          variants={itemVariants}
          src={logo}
          alt="Sentio"
          className="mx-auto h-16 w-16 mb-6 drop-shadow-[0_0_24px_hsl(190_95%_70%/0.45)]"
        />

        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-zinc-300 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <Sparkles className="h-3 w-3" />
          Sentio v1.0 Installer is Live
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-gradient-hero mb-6"
        >
          Agentic AI, directly<br />in your terminal.
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10"
        >
          Sentio is a zero-config terminal assistant. Download the standalone installer, authorize your device, and let AI manage your workspace.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 mb-10">
          <Button 
            size="lg" 
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-8 rounded-full text-base font-medium bg-white text-black hover:bg-zinc-200 glow-primary transition-all hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Sentio CLI
          </Button>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              macOS version
            </button>
            <span className="text-zinc-700 text-xs">•</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Linux version
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
          {chips.map((c, i) => (
            <motion.div 
              key={c}
              whileHover={{ scale: 1.05, borderColor: "rgba(100, 200, 255, 0.4)" }}
              className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-zinc-300 cursor-default transition-colors"
            >
              {c}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};