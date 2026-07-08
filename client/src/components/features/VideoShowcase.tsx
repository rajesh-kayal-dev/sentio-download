import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const VideoShowcase = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isPaused, setIsPaused] = useState(false);
  // const playerRef = useRef<any>(null);
  // const videoId = "vr6BmGpZjRs";

  // const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // const togglePlay = () => {
  //   if (!isPlaying) {
  //     setIsPlaying(true);
  //     setIsPaused(false);
  //   } else {
  //     if (isPaused) {
  //       playerRef.current?.playVideo();
  //       setIsPaused(false);
  //     } else {
  //       playerRef.current?.pauseVideo();
  //       setIsPaused(true);
  //     }
  //   }
  // };

  return null;

  // return (
  //   <section id="how-to-use" className="relative py-24 border-t border-white/5 overflow-hidden">
  //     <div className="absolute inset-0 bg-grid opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

  //     <div className="relative w-full px-6 sm:px-12">
  //       <div className="text-center mb-12">
  //         <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">See Sentio in Action</h2>
  //         <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
  //           A clean, immersive look at the Sentio CLI workflow.
  //         </p>
  //       </div>

  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.9, y: 40 }}
  //         whileInView={{ opacity: 1, scale: 1, y: 0 }}
  //         viewport={{ once: true, margin: "-100px" }}
  //         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  //         className="relative mx-auto max-w-3xl"
  //       >
  //         <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-primary/40 via-white/5 to-white/5 shadow-[0_0_100px_-20px_hsl(var(--primary)/0.2)]">
  //           <div className="relative aspect-video rounded-[calc(2rem-1px)] bg-[#0A0A0A] overflow-hidden group">
  //             {/* Empty video container - no YouTube link */}
  //           </div>
  //         </div>
  //       </motion.div>
  //     </div>
  //   </section>
  // );
};
