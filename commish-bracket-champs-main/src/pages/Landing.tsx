import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import commishWave from "@/assets/commish-wave.gif";
import { BRACKET_MODE_OPTIONS } from "@/data/mockData";

const Landing = () => {
  const navigate = useNavigate();
  const [showModeSelector, setShowModeSelector] = useState(false);

  const handleModeSelect = (mode: string) => {
    navigate("/matchup", { state: { bracketMode: mode } });
  };

  return (
    <div className="min-h-screen bg-gradient-court flex flex-col items-center px-4 py-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-40 -right-20 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* Title + Commish */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-bangers text-[12vw] md:text-7xl text-gradient-fire text-center tracking-widest leading-none z-10"
        >
          MARCH MADNESS 101
        </motion.h1>

        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
          className="flex items-center justify-center mb-4"
        >
          <motion.img
            src={commishWave}
            alt="The Commish"
            className="w-[80vw] max-w-[400px] aspect-square object-contain drop-shadow-2xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-body text-muted-foreground text-center text-sm z-10"
        >
          Learn about teams before you make picks!
        </motion.p>
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col gap-3 w-full max-w-xs mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModeSelector(true)}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-2xl tracking-widest glow-orange"
        >
          🏀 PLAY
        </motion.button>
      </motion.div>

      {/* Bracket Mode Selector Overlay */}
      <AnimatePresence>
        {showModeSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-end justify-center pb-10 px-4"
            onClick={() => setShowModeSelector(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs"
            >
              <h2 className="font-display text-2xl text-center text-foreground mb-2">CHOOSE YOUR MODE</h2>
              <p className="text-xs text-muted-foreground text-center font-body mb-5">How do you want to fill your bracket?</p>

              <div className="flex flex-col gap-3">
                {BRACKET_MODE_OPTIONS.map((mode) => (
                  <motion.button
                    key={mode}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleModeSelect(mode)}
                    className="w-full p-4 rounded-2xl bg-card border-2 border-border text-left hover:border-primary/60 transition-all"
                  >
                    <p className="font-display text-lg text-foreground">
                      {mode === "Classic Full Bracket" ? "📋" : "🔄"} {mode}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-1">
                      {mode === "Classic Full Bracket"
                        ? "Pick all 63 games upfront — the classic experience"
                        : "Pick each round as it opens — locks after tip-off"}
                    </p>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setShowModeSelector(false)}
                className="w-full mt-4 text-sm text-muted-foreground font-body text-center"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
