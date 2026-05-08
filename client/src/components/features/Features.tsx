import { Package, Brain, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Package, title: "Standalone Binary", desc: "No Node.js or npm required. Just download the installer and run it on your system." },
  { icon: Brain, title: "Context-Aware AI", desc: "Understands your local codebase and executes complex multi-step tasks instantly." },
  { icon: ShieldCheck, title: "Secure Device Flow", desc: "Enterprise-grade terminal authentication via your browser. No tokens to manage." },
];

export const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="features" className="px-6 py-32 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-grid opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      
      <div className="relative w-full px-6 sm:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl mx-auto mb-24"
        >
          Instant setup, intelligent commands, <span className="text-zinc-500">effortless workflow.</span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((f) => (
            <motion.div 
              key={f.title} 
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: "rgba(100, 200, 255, 0.3)" }}
              className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-primary" style={{ filter: "drop-shadow(0 0 8px hsl(190 95% 70% / 0.6))" }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};