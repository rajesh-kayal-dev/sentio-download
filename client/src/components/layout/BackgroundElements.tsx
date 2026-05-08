import { motion, useScroll, useTransform } from "framer-motion";

export const BackgroundElements = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const bubbles = [
    { size: 400, color: "rgba(100, 200, 255, 0.08)", x: "10%", y: "20%", duration: 25, delay: 0, yMotion: y1 },
    { size: 300, color: "rgba(150, 100, 255, 0.05)", x: "70%", y: "60%", duration: 30, delay: -5, yMotion: y2 },
    { size: 500, color: "rgba(100, 255, 200, 0.03)", x: "40%", y: "80%", duration: 35, delay: -10, yMotion: y3 },
    { size: 200, color: "rgba(100, 200, 255, 0.05)", x: "85%", y: "15%", duration: 20, delay: -2, yMotion: y1 },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          style={{ 
            y: b.yMotion,
            left: b.x, 
            top: b.y,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear"
          }}
          className="absolute rounded-full blur-[80px]"
        />
      ))}
    </div>
  );
};
