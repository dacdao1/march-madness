import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BRACKET_SCHEDULE, MATCHUPS, FRIEND_BRACKET_PICKS, GAMES_STARTED } from "@/data/mockData";

const PEOPLE = [
  { name: "You", emoji: "😎" },
  { name: "Cosmo Kramer", emoji: "🤪" },
  { name: "Sarah B.", emoji: "🔥" },
];

const getShortDate = (dateStr: string) => {
  const parts = dateStr.replace(/^[A-Za-z]+,\s*/, "").split(" ");
  return `${parts[0].slice(0, 3)} ${parts[1]}`;
};

const BracketTracker = () => {
  const navigate = useNavigate();
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const day = BRACKET_SCHEDULE[selectedDayIdx];

  const getPicksForPerson = (personName: string) => {
    if (personName === "You") return day.picks;
    // Hide other players' picks if games haven't started
    if (!GAMES_STARTED) return [];
    return FRIEND_BRACKET_PICKS[personName]?.[selectedDayIdx] ?? [];
  };

  const allMatchupIndices = new Set<number>();
  PEOPLE.forEach((person) => {
    getPicksForPerson(person.name).forEach((pick) => {
      allMatchupIndices.add(pick.matchup);
    });
  });
  // Always show all matchups for "You" even if hidden for others
  day.picks.forEach((pick) => allMatchupIndices.add(pick.matchup));
  const matchupRows = Array.from(allMatchupIndices).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gradient-court px-4 pt-6 pb-24">
      <h1 className="font-display text-3xl text-foreground mb-2">📊 YOUR BRACKET</h1>

      {/* Live mode banner */}
      {GAMES_STARTED ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3 px-4 py-2 rounded-xl bg-loss/20 border border-loss/40 text-loss text-xs font-display text-center"
        >
          🔒 BRACKET LOCKED — Games are live!
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3 px-4 py-2 rounded-xl bg-muted/50 border border-border text-muted-foreground text-xs font-body text-center"
        >
          👀 Friends' picks hidden until tip-off
        </motion.div>
      )}

      {/* Round Recap pill */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate("/recap")}
        className="w-full mb-4 py-2 px-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-between"
      >
        <span className="font-display text-sm text-secondary">📋 ROUND RECAP: Round of 64</span>
        <span className="text-xs text-secondary">View →</span>
      </motion.button>

      {/* Date Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {BRACKET_SCHEDULE.map((d, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDayIdx(idx)}
            className={`px-4 py-1.5 rounded-full font-body text-xs whitespace-nowrap transition-all ${
              selectedDayIdx === idx
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {getShortDate(d.date)}
          </button>
        ))}
      </div>

      {/* Day Header */}
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-display text-lg text-foreground">{day.label}</h3>
      </div>
      <p className="text-xs text-muted-foreground font-body mb-4">
        {day.gamesCount} game{day.gamesCount > 1 ? "s" : ""} · {day.date}
      </p>

      {/* Grid */}
      {matchupRows.length > 0 ? (
        <div className="rounded-xl border border-border overflow-hidden">
          <div>
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-px bg-border">
              <div className="bg-card p-3">
                <span className="font-display text-xs text-muted-foreground">MATCHUP</span>
              </div>
              {PEOPLE.map((person) => (
                <div key={person.name} className="bg-card p-3 text-center">
                  <span className="text-lg">{person.emoji}</span>
                  <p className="font-display text-xs text-foreground mt-0.5">{person.name}</p>
                </div>
              ))}
            </div>

            {/* Matchup Rows */}
            {matchupRows.map((matchupIdx, rowIdx) => {
              const matchup = MATCHUPS[matchupIdx];
              if (!matchup) return null;

              return (
                <motion.div
                  key={matchupIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIdx * 0.08 }}
                  className="grid grid-cols-4 gap-px bg-border"
                >
                  <div className="bg-card p-3 flex items-center">
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground leading-tight">
                        {matchup.teamA.name}
                      </p>
                      <p className="text-xs text-muted-foreground">vs {matchup.teamB.name}</p>
                    </div>
                  </div>

                  {PEOPLE.map((person) => {
                    const picks = getPicksForPerson(person.name);
                    const pick = picks.find((p) => p.matchup === matchupIdx);

                    // Show lock for friends if not started
                    if (!pick && person.name !== "You" && !GAMES_STARTED) {
                      return (
                        <div key={person.name} className="bg-card/50 p-3 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">🔒</span>
                        </div>
                      );
                    }

                    if (!pick) {
                      return (
                        <div key={person.name} className="bg-card/50 p-3 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">--</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={person.name}
                        className={`p-3 flex items-center justify-center gap-1.5 ${
                          pick.correct === true ? "bg-win/10" : pick.correct === false ? "bg-loss/10" : "bg-card"
                        }`}
                      >
                        <span className="text-sm">
                          {pick.correct === true ? "✅" : pick.correct === false ? "❌" : "⏳"}
                        </span>
                        <span className={`font-body text-xs font-semibold ${
                          pick.correct === true ? "text-win" : pick.correct === false ? "text-loss" : "text-foreground"
                        }`}>
                          {pick.team}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl border border-border bg-card/50 text-center">
          <p className="text-sm text-muted-foreground font-body">No picks yet for this day</p>
        </div>
      )}
    </div>
  );
};

export default BracketTracker;
