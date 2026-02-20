import { motion } from "framer-motion";
import { DRIP_ITEMS } from "@/data/mockData";

const APP_STORE_URL = "https://apps.apple.com/us/app/takes/id1633475437";

const EndOfTournament = () => {
  const earned = DRIP_ITEMS.filter((d) => d.earned);

  const ctaButtons = [
    { icon: "🌍", label: "UNLOCK WORLD CUP BRACKET" },
    { icon: "⛳", label: "JOIN MASTERS WAITLIST" },
    { icon: "📲", label: "GET EARLY ACCESS IN APP" },
  ];

  return (
    <div className="min-h-screen bg-gradient-court flex flex-col items-center px-6 py-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
        className="text-7xl mb-4 mt-4"
      >
        🏆
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-5xl text-gradient-fire text-center mb-2"
      >
        TOURNAMENT OVER
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-6"
      >
        <p className="font-display text-2xl text-foreground">You finished <span className="text-primary">#42</span> globally</p>
        <p className="font-body text-sm text-muted-foreground mt-1">Top 15% • 12 correct picks</p>
      </motion.div>

      {/* Drip earned summary */}
      {earned.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 mb-8"
        >
          <p className="font-display text-sm text-muted-foreground mb-3">DRIP EARNED THIS TOURNAMENT</p>
          <div className="flex flex-wrap gap-2">
            {earned.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 bg-muted/50 rounded-full px-2.5 py-1"
              >
                <span className="text-sm">{item.emoji}</span>
                <span className="font-body text-xs text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        {ctaButtons.map((btn, i) => (
          <motion.button
            key={btn.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open(APP_STORE_URL, "_blank", "noopener,noreferrer")}
            className={`w-full py-4 rounded-2xl font-display text-lg tracking-wider ${
              i === 0
                ? "bg-primary text-primary-foreground glow-orange"
                : i === 1
                ? "bg-secondary text-secondary-foreground glow-blue"
                : "bg-card border border-primary/40 text-primary"
            }`}
          >
            {btn.icon} {btn.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-xs text-muted-foreground font-body mt-6 text-center max-w-xs"
      >
        Your drip is saved. See you next season 🏀
      </motion.p>
    </div>
  );
};

export default EndOfTournament;
