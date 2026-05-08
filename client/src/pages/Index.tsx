import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/features/Hero";
import { VideoShowcase } from "@/components/features/VideoShowcase";
import { Features } from "@/components/features/Features";
import { InteractiveBubbles } from "@/components/layout/InteractiveBubbles";
import { motion } from "framer-motion";

const Index = () => (
  <main className="min-h-screen text-foreground relative">
    <Navbar />
    
    <div className="relative z-10">
      <Hero />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <VideoShowcase />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Features />
      </motion.div>

      <Footer />
    </div>
  </main>
);

export default Index;
