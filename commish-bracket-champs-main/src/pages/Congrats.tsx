import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MATCHUPS } from "@/data/mockData";

const Congrats = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const picks: string[] = (location.state as { picks?: string[] })?.picks ?? [];
  const bracketMode: string = (location.state as { bracketMode?: string })?.bracketMode ?? "Classic Full Bracket";

  return (
    <div className="min-h-screen bg-gradient-court flex flex-col items-center px-6 py-10 pb-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-6xl mb-4 mt-6"
      >
        🎉
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-display text-4xl text-gradient-fire text-center mb-1"
      >
        BRACKET COMPLETE!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-muted-foreground font-body text-center mb-6 text-sm"
      >
        Your picks are locked in. Share your bracket and see who really knows March Madness!
      </motion.p>

      {/* Bracket Summary Card */}
      {picks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-display text-sm text-foreground">YOUR PICKS</p>
            <span className="font-body text-xs text-muted-foreground">{picks.length}/{MATCHUPS.length}</span>
          </div>
          <div className="space-y-1.5">
            {picks.map((pick, i) => {
              const matchup = MATCHUPS[i];
              return (
                <div key={i} className="flex items-center justify-between text-xs font-body">
                  <span className="text-muted-foreground">{matchup?.teamA.name} vs {matchup?.teamB.name}</span>
                  <span className="font-semibold text-primary">✓ {pick}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground font-body">
              Mode: <span className="text-foreground">{bracketMode}</span>
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/share", { state: { picks, bracketMode } })}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-xl tracking-wider glow-orange"
        >
          📤 SHARE YOUR BRACKET
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/end")}
          className="w-full py-3 rounded-2xl bg-card border border-border text-foreground font-display text-base tracking-wider"
        >
          🏆 Tournament Over?
        </motion.button>

        <button
          onClick={() => navigate("/bracket")}
          className="text-muted-foreground font-body text-sm underline mt-1 text-center"
        >
          View my bracket →
        </button>
      </motion.div>
    </div>
  );
};

export default Congrats;
