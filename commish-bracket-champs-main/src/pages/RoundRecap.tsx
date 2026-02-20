import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUND_RECAP } from "@/data/mockData";

const RoundRecap = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: "🎯",
      title: "Upsets Hit",
      items: ROUND_RECAP.upsets.map((u) => u.description),
    },
    {
      icon: "📊",
      title: "Your Group",
      items: [`${ROUND_RECAP.groupCorrectPct}% of your group got ${ROUND_RECAP.groupTeam} right`],
    },
    {
      icon: "🤯",
      title: "Biggest Anomaly",
      items: [ROUND_RECAP.biggestAnomaly],
    },
    {
      icon: "🏫",
      title: "Campus Shift",
      items: [
        `${ROUND_RECAP.campusShift.emoji} ${ROUND_RECAP.campusShift.group} moved from #${ROUND_RECAP.campusShift.from} → #${ROUND_RECAP.campusShift.to} this round`,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-court px-4 pt-6 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-muted-foreground font-body mb-4 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="font-display text-4xl text-gradient-fire">ROUND RECAP</h1>
        <p className="font-body text-muted-foreground text-sm mt-1">{ROUND_RECAP.round} — Complete</p>
      </motion.div>

      {/* Recap Cards */}
      <div className="space-y-3 mt-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{card.icon}</span>
              <h2 className="font-display text-lg text-foreground">{card.title}</h2>
            </div>
            <div className="space-y-1.5">
              {card.items.map((item, j) => (
                <p key={j} className="font-body text-sm text-foreground/80 leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upset breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card border border-border rounded-2xl p-4 mt-3"
      >
        <h2 className="font-display text-base text-foreground mb-3">🎲 Upset Pick Breakdown</h2>
        {ROUND_RECAP.upsets.map((u, i) => (
          <div key={i} className="flex items-center justify-between mb-2">
            <span className="font-body text-sm text-foreground">{u.team} over {u.opponent}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - u.missedByPct}%` }}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                  className="h-full bg-win rounded-full"
                />
              </div>
              <span className="text-xs text-muted-foreground">{100 - u.missedByPct}% correct</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col gap-3 mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/bracket")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-xl tracking-wider glow-orange"
        >
          📊 SEE FULL BRACKET
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/leaderboard")}
          className="w-full py-3 rounded-2xl bg-card border border-border text-foreground font-display text-lg tracking-wider"
        >
          🏆 CHECK LEADERBOARD
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RoundRecap;
