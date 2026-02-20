import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { MATCHUPS } from "@/data/mockData";

const ShareScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const picks: string[] = (location.state as { picks?: string[] })?.picks ?? [];
  const [copied, setCopied] = useState(false);

  const shareLink = "https://commish-bracket-champs.lovable.app";
  const shareText = "I just picked my March Madness bracket! Can you beat me?";

  const copyToClipboard = async (showCopiedState = true) => {
    try {
      await navigator.clipboard.writeText(shareLink);
      if (showCopiedState) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      return true;
    } catch {
      toast("Couldn't copy automatically. Copy this link: " + shareLink);
      return false;
    }
  };

  const handleCopy = () => copyToClipboard(true);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Final Four 101", text: shareText, url: shareLink });
        return;
      }
    } catch {}
    const ok = await copyToClipboard(true);
    if (ok) toast("Link copied to clipboard!");
  };

  const handleiMessage = () => {
    window.open(`sms:?body=${encodeURIComponent(shareText + " " + shareLink)}`, "_self");
  };

  const handleSnapchat = async () => {
    const ok = await copyToClipboard(false);
    if (ok) toast("Link copied! Paste it in your Snapchat chat or story");
  };

  return (
    <div className="min-h-screen bg-gradient-court flex flex-col items-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="text-5xl mb-3">📤</div>
        <h1 className="font-display text-4xl text-foreground mb-1">SHARE BRACKET</h1>
        <p className="text-muted-foreground font-body text-sm max-w-xs">
          Challenge your friends and see who really knows March Madness
        </p>
      </motion.div>

      {/* Bracket picks preview */}
      {picks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 mb-4"
        >
          <p className="font-display text-xs text-muted-foreground mb-2">YOUR PICKS PREVIEW</p>
          <div className="space-y-1">
            {picks.map((pick, i) => {
              const matchup = MATCHUPS[i];
              return (
                <div key={i} className="flex items-center justify-between text-xs font-body">
                  <span className="text-muted-foreground truncate">{matchup?.teamA.name} vs {matchup?.teamB.name}</span>
                  <span className="font-semibold text-primary ml-2 shrink-0">✓ {pick}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Share Link */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 mb-6"
      >
        <p className="text-xs text-muted-foreground mb-2 font-body">Your challenge link</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm font-body text-primary truncate">{shareLink}</code>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-body"
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>
      </motion.div>

      {/* Share Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-xl tracking-wider glow-orange"
        >
          📤 SHARE
        </motion.button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleiMessage}
            className="py-3 rounded-xl bg-card border border-border text-foreground font-body text-xs"
          >
            💬 iMessage
          </button>
          <button
            onClick={handleSnapchat}
            className="py-3 rounded-xl bg-card border border-border text-foreground font-body text-xs"
          >
            👻 Snapchat
          </button>
        </div>

        <button
          onClick={() => navigate("/leaderboard")}
          className="text-muted-foreground font-body text-sm underline mt-4 text-center"
        >
          View leaderboards →
        </button>
      </motion.div>
    </div>
  );
};

export default ShareScreen;
