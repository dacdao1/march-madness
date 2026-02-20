import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CommishProps {
  name: string;
  gifSrc: string;
  teamName: string;
  teamColor: string;
  teamSeed: number;
  points: string[];
  side: "top" | "bottom";
  onPick: () => void;
}

const Commish = ({ name, gifSrc, teamName, teamColor, teamSeed, points, side, onPick }: CommishProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      {...(side === "top"
        ? { animate: { opacity: 1 } }
        : { whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 } }
      )}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* GIF hero with overlay */}
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border-2"
        style={{
          borderColor: teamColor,
          boxShadow: `0 0 16px ${teamColor}44`,
        }}
      >
        {/* Jersey badge */}
        <div
          className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-display border-2 border-white/30"
          style={{ backgroundColor: teamColor }}
        >
          {teamSeed}
        </div>

        <img
          src={side === "top" || isInView ? gifSrc : undefined}
          alt={name}
          className="w-full h-48 object-contain"
          style={{
            transform: side === "bottom" ? "scaleX(-1)" : undefined,
          }}
        />
      </div>

      {/* Bullet points below GIF */}
      <div className="mt-2 space-y-1 px-1">
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            {...(side === "top"
              ? { animate: { opacity: 1 } }
              : { whileInView: { opacity: 1 }, viewport: { once: true } }
            )}
            transition={{ delay: side === "top" ? 0.8 + i * 0.2 : 0.3 + i * 0.2, duration: 0.4 }}
            className="flex items-start gap-2 text-xs font-body"
          >
            <span className="mt-0.5" style={{ color: teamColor }}>▸</span>
            <span className="text-foreground/90">{point}</span>
          </motion.div>
        ))}
      </div>

      {/* Pick button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onPick}
        className="mt-3 w-full py-3 rounded-xl font-display text-xl tracking-wider transition-all"
        style={{
          background: `linear-gradient(135deg, ${teamColor}, ${teamColor}cc)`,
          color: "white",
          boxShadow: `0 4px 20px ${teamColor}44`,
        }}
      >
        PICK {teamName.toUpperCase()}
      </motion.button>
    </motion.div>
  );
};

export default Commish;
