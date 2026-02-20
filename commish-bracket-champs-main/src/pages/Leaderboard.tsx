import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FRIEND_LEADERBOARD,
  CAMPUS_LEADERBOARD,
  CUSTOM_GROUP_LEADERBOARD,
  GLOBAL_LEADERBOARD,
  type GroupEntry,
  type CampusEntry,
} from "@/data/mockData";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Tab = "friends" | "groups" | "campuses" | "global";

const RankArrow = ({ change }: { change?: number }) => {
  if (!change || change === 0) return <span className="text-xs text-muted-foreground">—</span>;
  if (change > 0) return <span className="text-xs text-win font-display">↑{change}</span>;
  return <span className="text-xs text-loss font-display">↓{Math.abs(change)}</span>;
};

const MAX_AVG = 120;

const Leaderboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("friends");
  const [selectedCampus, setSelectedCampus] = useState<CampusEntry | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupEntry | null>(null);
  const [joinedCampus, setJoinedCampus] = useState<string | null>(null);
  const [expandedCampus, setExpandedCampus] = useState<string | null>(null);

  const top1 = CAMPUS_LEADERBOARD[0];
  const top2 = CAMPUS_LEADERBOARD[1];
  const rivalryPct1 = Math.round((top1.totalPoints / (top1.totalPoints + top2.totalPoints)) * 100);
  const rivalryPct2 = 100 - rivalryPct1;

  return (
    <div className="min-h-screen bg-gradient-court px-4 pt-6 pb-24">
      <h1 className="font-display text-3xl text-foreground mb-4">🏆 LEADERBOARD</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-card rounded-xl p-1 mb-6 border border-border">
        {(["friends", "groups", "campuses", "global"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg font-display text-xs tracking-wider transition-all ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {t === "friends" ? "👫" : t === "groups" ? "👥" : t === "campuses" ? "🏫" : "🌍"}
            <span className="hidden sm:inline ml-1 capitalize">{t}</span>
          </button>
        ))}
      </div>

      {/* Friends Tab */}
      {tab === "friends" && (
        <div className="space-y-2">
          {FRIEND_LEADERBOARD.map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-3 p-3 rounded-xl border ${
                entry.name === "You" ? "bg-primary/10 border-primary/30" : "bg-card border-border"
              }`}
            >
              <div className="flex flex-col items-center w-7 gap-0.5">
                <span className="font-display text-base text-muted-foreground leading-none">{entry.rank}</span>
                <RankArrow change={entry.rankChange} />
              </div>
              <span className="text-2xl">{entry.avatar}</span>
              <div className="flex-1">
                <p className={`font-body text-sm font-semibold ${entry.name === "You" ? "text-primary" : "text-foreground"}`}>
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">{entry.correctPicks} correct picks</p>
                {entry.groupPickSamePct && (
                  <p className="text-xs text-muted-foreground/70">{entry.groupPickSamePct}% of group agreed</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-display text-lg text-foreground">{entry.points}</p>
                <p className="text-xs text-drip-gold">🔥 {entry.drip} drip</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Groups Tab */}
      {tab === "groups" && (
        <div className="space-y-2">
          <button
            onClick={() => navigate("/groups/new")}
            className="w-full py-3 rounded-xl border-2 border-dashed border-primary/40 text-primary font-display text-sm tracking-wider hover:bg-primary/5 transition-all mb-3"
          >
            + Create or Join Group
          </button>
          <p className="text-xs text-muted-foreground mb-3 font-body">Tap a group to see breakdown</p>
          {CUSTOM_GROUP_LEADERBOARD.map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedGroup(entry)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:border-primary/30 transition-all ${
                entry.memberDetails?.some((m) => m.name === "You") ? "bg-primary/10 border-primary/30" : "bg-card border-border"
              }`}
            >
              <span className="font-display text-lg w-6 text-center text-muted-foreground">{entry.rank}</span>
              <span className="text-2xl">{entry.emoji}</span>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-foreground">{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.members} members · avg {entry.avgPoints} pts</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg text-foreground">{entry.totalPoints.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">total pts</p>
              </div>
            </motion.div>
          ))}

          {/* Group drill-down drawer */}
          <Drawer open={selectedGroup !== null} onOpenChange={(open) => !open && setSelectedGroup(null)}>
            <DrawerContent>
              {selectedGroup && (
                <div className="px-6 pb-8 pt-2">
                  <DrawerHeader className="p-0 mb-4">
                    <div className="text-4xl text-center mb-1">{selectedGroup.emoji}</div>
                    <DrawerTitle className="text-center font-display text-xl">{selectedGroup.name}</DrawerTitle>
                    <DrawerDescription className="text-center text-xs">#{selectedGroup.rank} globally · {selectedGroup.members} members</DrawerDescription>
                  </DrawerHeader>

                  <div className="space-y-2 mb-4">
                    {selectedGroup.memberDetails.map((member, i) => (
                      <div
                        key={member.name}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border ${
                          member.name === "You" ? "bg-primary/10 border-primary/30" : "bg-card border-border"
                        }`}
                      >
                        <span className="font-display text-sm text-muted-foreground w-5">{i + 1}</span>
                        <span className="text-lg">{member.avatar}</span>
                        <div className="flex-1">
                          <p className={`font-body text-sm font-semibold ${member.name === "You" ? "text-primary" : "text-foreground"}`}>
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{member.correctPicks} correct</p>
                        </div>
                        <p className="font-display text-base text-foreground">{member.points}</p>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setSelectedGroup(null)} className="w-full text-sm text-muted-foreground font-body">
                    Close
                  </button>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      )}

      {/* Campuses Tab */}
      {tab === "campuses" && (
        <div className="space-y-3">
          {/* Campus Rank badge if joined */}
          {joinedCampus && (
            <div className="flex justify-center mb-1">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-display border border-primary/30">
                🏫 {CAMPUS_LEADERBOARD.find(c => c.group === joinedCampus)?.group} #{CAMPUS_LEADERBOARD.find(c => c.group === joinedCampus)?.rank}
              </span>
            </div>
          )}

          {/* Rivalry meter */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-2">
            <p className="text-xs font-display text-muted-foreground text-center mb-2">⚔️ CAMPUS RIVALRY</p>
            <div className="flex justify-between text-xs font-body mb-1">
              <span className="text-primary">{top1.emoji} {top1.group} ({rivalryPct1}%)</span>
              <span className="text-secondary">{top2.emoji} {top2.group} ({rivalryPct2}%)</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden flex bg-secondary/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rivalryPct1}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full bg-primary rounded-l-full"
              />
            </div>
          </div>

          {CAMPUS_LEADERBOARD.map((entry, i) => (
            <motion.div
              key={entry.group}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl border overflow-hidden ${
                joinedCampus === entry.group ? "border-primary/30" : "border-border"
              }`}
            >
              {/* Campus row */}
              <div
                onClick={() => setSelectedCampus(entry)}
                className={`flex items-center gap-3 p-3 cursor-pointer ${
                  joinedCampus === entry.group ? "bg-primary/10" : "bg-card"
                }`}
              >
                <span className="font-display text-lg w-6 text-center text-muted-foreground">{entry.rank}</span>
                <span className="text-2xl">{entry.emoji}</span>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-foreground">{entry.group}</p>
                  <p className="text-xs text-muted-foreground">{entry.members} members</p>
                  {/* Progress bar */}
                  <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((entry.avgPoints / MAX_AVG) * 100, 100)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{entry.avgPoints} avg pts</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-base text-foreground">{entry.totalPoints.toLocaleString()}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCampus(expandedCampus === entry.group ? null : entry.group);
                    }}
                    className="text-[10px] text-primary font-body mt-0.5"
                  >
                    {expandedCampus === entry.group ? "▲ hide" : "▼ top 5"}
                  </button>
                </div>
              </div>

              {/* Top 5 players accordion */}
              <AnimatePresence>
                {expandedCampus === entry.group && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="px-3 py-2 bg-background/50 space-y-1">
                      {entry.topPlayers.map((player, pi) => (
                        <div key={player.name} className="flex items-center gap-2 text-xs py-1">
                          <span className="text-muted-foreground w-4 font-display">{pi + 1}</span>
                          <span>{player.avatar}</span>
                          <span className="flex-1 font-body text-foreground">{player.name}</span>
                          <span className="font-display text-foreground">{player.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Campus detail drawer */}
          <Drawer open={selectedCampus !== null} onOpenChange={(open) => !open && setSelectedCampus(null)}>
            <DrawerContent>
              {selectedCampus && (
                <div className="px-6 pb-8 pt-2">
                  <DrawerHeader className="p-0 mb-4">
                    <div className="text-5xl text-center mb-2">{selectedCampus.emoji}</div>
                    <DrawerTitle className="text-center font-display text-2xl">{selectedCampus.group}</DrawerTitle>
                    <DrawerDescription className="text-center">Campus rivalry group</DrawerDescription>
                  </DrawerHeader>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-card rounded-xl p-3 border border-border text-center">
                      <p className="font-display text-lg text-foreground">{selectedCampus.members}</p>
                      <p className="text-xs text-muted-foreground">Members</p>
                    </div>
                    <div className="bg-card rounded-xl p-3 border border-border text-center">
                      <p className="font-display text-lg text-foreground">{selectedCampus.avgPoints}</p>
                      <p className="text-xs text-muted-foreground">Avg Points</p>
                    </div>
                    <div className="bg-card rounded-xl p-3 border border-border text-center">
                      <p className="font-display text-lg text-foreground">{selectedCampus.totalPoints.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Points</p>
                    </div>
                    <div className="bg-card rounded-xl p-3 border border-border text-center">
                      <p className="font-display text-lg text-foreground">#{selectedCampus.rank}</p>
                      <p className="text-xs text-muted-foreground">Rank</p>
                    </div>
                  </div>

                  {joinedCampus === selectedCampus.group ? (
                    <Badge className="w-full justify-center py-2 text-sm">✅ Your Campus</Badge>
                  ) : (
                    <Button
                      className="w-full font-display tracking-wider"
                      onClick={() => {
                        setJoinedCampus(selectedCampus.group);
                        toast.success(`You joined ${selectedCampus.group}! 🎉`);
                        setSelectedCampus(null);
                      }}
                    >
                      Join This Campus
                    </Button>
                  )}

                  <button onClick={() => setSelectedCampus(null)} className="w-full mt-3 text-sm text-muted-foreground font-body">
                    Close
                  </button>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      )}

      {/* Global Tab */}
      {tab === "global" && (
        <div className="space-y-2">
          {GLOBAL_LEADERBOARD.map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-3 p-3 rounded-xl border ${
                entry.name === "You" ? "bg-primary/10 border-primary/30" : "bg-card border-border"
              }`}
            >
              <div className="flex flex-col items-center w-8 gap-0.5">
                <span className={`font-display text-base leading-none ${entry.rank <= 3 ? "text-drip-gold" : "text-muted-foreground"}`}>
                  {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : `#${entry.rank}`}
                </span>
                <RankArrow change={entry.rankChange} />
              </div>
              <span className="text-2xl">{entry.avatar}</span>
              <div className="flex-1">
                <p className={`font-body text-sm font-semibold ${entry.name === "You" ? "text-primary" : "text-foreground"}`}>
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">{entry.correctPicks} correct · 🔥 {entry.drip} drip</p>
              </div>
              <p className="font-display text-lg text-foreground">{entry.points}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
