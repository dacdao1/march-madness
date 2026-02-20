import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SCORE_UPDATES, GAMES_STARTED, UPSET_ALERT } from "@/data/mockData";

const USER_CAMPUS = "Oregon"; // simulated joined campus team

const ScoreUpdates = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const update = SCORE_UPDATES[currentIdx];

  const isCampusGame =
    update.teamA === USER_CAMPUS || update.teamB === USER_CAMPUS || update.campusTeam !== null;

  return (
    <div className="min-h-screen bg-gradient-court px-4 pt-6 pb-24">
      <h1 className="font-display text-3xl text-foreground mb-4">📰 SCORE UPDATES</h1>

      {/* Upset alert banner (live mode) */}
      {GAMES_STARTED && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 px-4 py-2 rounded-xl bg-loss/20 border border-loss/40 text-loss text-xs font-display text-center"
        >
          🚨 {UPSET_ALERT}
        </motion.div>
      )}

      {/* Round recap banner */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate("/recap")}
        className="w-full mb-4 py-2 px-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-between"
      >
        <span className="font-display text-sm text-secondary">📋 ROUND RECAP: Round of 64</span>
        <span className="text-xs text-secondary">View →</span>
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          {/* Campus team badge */}
          {isCampusGame && (
            <div className="mb-3 flex justify-end">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-body">
                ⭐ Your Campus Team
              </span>
            </div>
          )}

          {/* Score */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center flex-1">
              <p className="font-display text-xl text-foreground">{update.teamA}</p>
              <p className="font-display text-4xl text-primary">{update.scoreA}</p>
            </div>
            <span className="font-display text-lg text-muted-foreground">—</span>
            <div className="text-center flex-1">
              <p className="font-display text-xl text-foreground">{update.teamB}</p>
              <p className="font-display text-4xl text-muted-foreground">{update.scoreB}</p>
            </div>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-win/20 text-win text-xs font-body mb-3">
            {update.status}
          </span>

          <p className="font-body text-sm text-foreground/80 leading-relaxed">
            {update.narrative}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {SCORE_UPDATES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === currentIdx ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-6 justify-center">
        <button onClick={() => navigate("/bracket")} className="text-sm text-primary font-body underline">
          View Bracket
        </button>
        <button onClick={() => navigate("/leaderboard")} className="text-sm text-secondary font-body underline">
          Leaderboards
        </button>
      </div>
    </div>
  );
};

export default ScoreUpdates;
