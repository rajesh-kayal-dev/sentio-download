import { Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoId = "vr6BmGpZjRs";
  const playerRef = useRef<any>(null);
  
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Load YouTube API
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      if (isPaused) {
        playerRef.current?.playVideo();
        setIsPaused(false);
      } else {
        playerRef.current?.pauseVideo();
        setIsPaused(true);
      }
    }
  };

  return (
    <section id="how-to-use" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      
      <div className="relative w-full px-6 sm:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">See Sentio in Action</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            A clean, immersive look at the Sentio CLI workflow.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-primary/40 via-white/5 to-white/5 shadow-[0_0_100px_-20px_hsl(var(--primary)/0.2)]">
            <div className="relative aspect-video rounded-[calc(2rem-1px)] bg-[#0A0A0A] overflow-hidden group">
              
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 cursor-pointer"
                    onClick={togglePlay}
                  >
                    <img 
                      src={thumbnailUrl} 
                      alt="" 
                      className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-110">
                        <Play className="h-8 w-8 fill-black ml-1" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Custom Controls Overlay */}
              {isPlaying && (
                <div 
                  className="absolute inset-0 z-10 cursor-pointer group/overlay"
                  onClick={togglePlay}
                >
                  <AnimatePresence>
                    {(isPaused || isPlaying) && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-opacity"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
                          {isPaused ? <Play size={32} className="fill-white ml-1" /> : <Pause size={32} className="fill-white" />}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {isPlaying && (
                <iframe
                  id="sentio-video"
                  src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1`}
                  title="YouTube video player"
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => {
                    if ((window as any).YT) {
                      new (window as any).YT.Player('sentio-video', {
                        events: {
                          'onReady': onPlayerReady
                        }
                      });
                    }
                  }}
                ></iframe>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
