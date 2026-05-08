import logo from "@/assets/sentio-logo.png";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export const Logo = ({ className = "", showWordmark = true, size = 28 }: LogoProps) => (
  <a href="/" className={`flex items-center gap-2 font-bold tracking-tight ${className}`}>
    <img
      src={logo}
      alt="Sentio"
      style={{ width: size, height: size }}
      className="object-contain drop-shadow-[0_0_12px_hsl(190_95%_70%/0.35)]"
    />
    {showWordmark && <span className="text-white">Sentio</span>}
  </a>
);