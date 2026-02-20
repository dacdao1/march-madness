import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Commish from "@/components/Commish";
import { MATCHUPS, GAMES_STARTED, UPSET_ALERT, NEXT_ROUND_OPENS_IN } from "@/data/mockData";
import commishBlazeGif from "@/assets/commish-blaze.gif";
import commishCarlGif from "@/assets/commish-carl.gif";

const getSeedLabel = (seed: number) => {
  if (seed <= 3) return { label: "Favorite", color: "bg-win/20 text-win" };
  if (seed <= 8) return { label: "Underdog", color: "bg-yellow-500/20 text-yellow-400" };
  return { label: "Strong Underdog", color: "bg-loss/20 text-loss" };
};

const getRarityInfo = (pickPct: number) => {
  if (pickPct < 10) return { tier: "Legendary 👑", color: "text-drip-gold", bg: "bg-drip-gold/20", msg: `Only ${pickPct}% picked this` };
  if (pickPct < 25) return { tier: "Epic 🔮", color: "text-drip-purple", bg: "bg-drip-purple/20", msg: `Only ${pickPct}% picked this` };
  if (pickPct < 40) return { tier: "Rare 💎", color: "text-secondary", bg: "bg-secondary/20", msg: `${pickPct}% picked this` };
  return { tier: "Common", color: "text-muted-foreground", bg: "bg-muted", msg: `Popular pick — ${pickPct}% agreed` };
};

const MatchupScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bracketMode = (location.state as { bracketMode?: string })?.bracketMode ?? "Classic Full Bracket";

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRarity, setShowRarity] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPct, setSelectedPct] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);

  const matchup = MATCHUPS[currentIdx];
  if (!matchup) return null;

  const labelA = getSeedLabel(matchup.teamA.seed);
  const labelB = getSeedLabel(matchup.teamB.seed);

  const handlePick = (team: string, pickPct: number) => {
    setSelectedTeam(team);
    setSelectedPct(pickPct);
    setShowConfirm(true);
    setShowRarity(false);
    setPicks((prev) => [...prev, team]);

    setTimeout(() => setShowRarity(true), 1000);

    setTimeout(() => {
      setShowConfirm(false);
      setShowRarity(false);
      if (currentIdx < MATCHUPS.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        navigate("/congrats", { state: { picks: [...picks, team], bracketMode } });
      }
    }, 3000);
  };

  const rarity = getRarityInfo(selectedPct);

  return (
    <div className="min-h-screen bg-gradient-court px-4 pt-6 pb-24">
      {/* Live mode upset alert */}
      {GAMES_STARTED && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 px-4 py-2 rounded-xl bg-loss/20 border border-loss/40 text-loss text-xs font-display text-center"
        >
          🚨 {UPSET_ALERT}
        </motion.div>
      )}

      {/* Bracket mode badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-sm text-muted-foreground">{matchup.round}</span>
        <span className="text-xs font-body px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
          {bracketMode === "Round-by-Round Mode" ? "🔄 Round-by-Round" : "📋 Full Bracket"}
        </span>
      </div>

      {/* VS Header with seeds + labels + pick % bar */}
      <motion.div
        key={matchup.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-4 mb-6"
      >
        <div className="flex items-start justify-center gap-3 mb-3">
          <div className="text-center flex-1">
            <span className="font-display text-xl" style={{ color: matchup.teamA.color }}>
              ({matchup.teamA.seed}) {matchup.teamA.name}
            </span>
            <p className="text-xs text-muted-foreground">{matchup.teamA.record}</p>
            <span className={`inline-block mt-1 text-[10px] font-body px-2 py-0.5 rounded-full ${labelA.color}`}>
              {labelA.label}
            </span>
          </div>
          <span className="font-display text-2xl text-muted-foreground pt-1">VS</span>
          <div className="text-center flex-1">
            <span className="font-display text-xl" style={{ color: matchup.teamB.color }}>
              ({matchup.teamB.seed}) {matchup.teamB.name}
            </span>
            <p className="text-xs text-muted-foreground">{matchup.teamB.record}</p>
            <span className={`inline-block mt-1 text-[10px] font-body px-2 py-0.5 rounded-full ${labelB.color}`}>
              {labelB.label}
            </span>
          </div>
        </div>

        {/* Pick % split bar */}
        {!GAMES_STARTED && (
          <div>
            <div className="flex justify-between text-xs font-body text-muted-foreground mb-1">
              <span style={{ color: matchup.teamA.color }}>{matchup.pickPercentA}% picking {matchup.teamA.name}</span>
              <span style={{ color: matchup.teamB.color }}>{matchup.pickPercentB}% picking {matchup.teamB.name}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden flex" style={{ background: `${matchup.teamB.color}44` }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${matchup.pickPercentA}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: matchup.teamA.color }}
              />
            </div>
          </div>
        )}

        {/* Lock banner for round-by-round mode between rounds */}
        {bracketMode === "Round-by-Round Mode" && (
          <div className="mt-3 text-center text-xs font-body text-muted-foreground">
            🔒 Next round opens in <span className="text-primary font-semibold">{NEXT_ROUND_OPENS_IN}</span>
          </div>
        )}
      </motion.div>

      {/* Commish Debate */}
      <AnimatePresence mode="wait">
        <motion.div key={`${matchup.id}-debate`} className="space-y-6">
          <Commish
            name={matchup.commishA.name}
            gifSrc={commishBlazeGif}
            teamName={matchup.teamA.name}
            teamColor={matchup.teamA.color}
            teamSeed={matchup.teamA.seed}
            points={matchup.commishA.points}
            side="top"
            onPick={() => handlePick(matchup.teamA.name, matchup.pickPercentA)}
          />

          <div className="flex items-center justify-center">
            <div className="h-px flex-1 bg-border" />
            <span className="px-3 font-display text-sm text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Commish
            name={matchup.commishB.name}
            gifSrc={commishCarlGif}
            teamName={matchup.teamB.name}
            teamColor={matchup.teamB.color}
            teamSeed={matchup.teamB.seed}
            points={matchup.commishB.points}
            side="bottom"
            onPick={() => handlePick(matchup.teamB.name, matchup.pickPercentB)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="fixed bottom-20 left-0 right-0 flex items-center justify-center gap-3 px-4">
        <div className="flex gap-1.5">
          {MATCHUPS.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < currentIdx ? "bg-win" : i === currentIdx ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className="font-body text-xs text-muted-foreground">
          {currentIdx + 1}/{MATCHUPS.length}
        </span>
      </div>

      {/* Pick Confirmation Overlay */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-card border border-primary rounded-3xl p-8 text-center max-w-xs mx-4"
            >
              <div className="text-5xl mb-4">✅</div>
              <h2 className="font-display text-3xl text-primary mb-1">LOCKED IN!</h2>
              <p className="font-body text-foreground text-lg">{selectedTeam}</p>

              <AnimatePresence>
                {showRarity && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`mt-4 px-4 py-2 rounded-2xl ${rarity.bg}`}
                  >
                    <p className={`font-display text-sm ${rarity.color}`}>{rarity.tier}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{rarity.msg} 🔥</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted-foreground mt-3">Moving to next matchup...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchupScreen;
