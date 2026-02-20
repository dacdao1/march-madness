import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PRESET_EMOJIS = ["🎯", "💀", "✨", "💥", "🔥", "🏀", "👑", "🦆", "🐍", "🎲", "⚡", "🦅"];

const generateInviteCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const suffix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `MARCH-${suffix}`;
};

const CreateGroup = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"create" | "join">("create");
  const [groupName, setGroupName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎯");
  const [inviteCode, setInviteCode] = useState("");
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  const handleCreate = () => {
    if (groupName.length < 3 || groupName.length > 30) {
      toast.error("Group name must be 3-30 characters");
      return;
    }
    const code = generateInviteCode();
    setCreatedCode(code);
    toast.success(`"${groupName}" created!`);
  };

  const handleCopyCode = async () => {
    if (!createdCode) return;
    await navigator.clipboard.writeText(createdCode);
    toast.success("Code copied!");
  };

  const handleJoin = () => {
    if (!inviteCode.trim()) {
      toast.error("Enter an invite code");
      return;
    }
    toast.success("Joined group!");
    setTimeout(() => navigate("/leaderboard"), 1200);
  };

  const handleDone = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="min-h-screen bg-gradient-court flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-5xl mb-4">👥</div>
        <h1 className="font-display text-4xl text-foreground mb-2">GROUPS</h1>
        <p className="text-muted-foreground font-body text-sm max-w-xs">
          Create a group and invite friends, or join one with a code
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs"
      >
        {/* Toggle */}
        <div className="flex gap-1 bg-card rounded-xl p-1 mb-6 border border-border">
          {(["create", "join"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setCreatedCode(null); }}
              className={`flex-1 py-2 rounded-lg font-body text-sm transition-all ${
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "create" ? "✨ Create" : "🔑 Join"}
            </button>
          ))}
        </div>

        {/* Create Mode */}
        {mode === "create" && !createdCode && (
          <motion.div
            key="create-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="font-body text-xs text-muted-foreground mb-1 block">Group Name</label>
              <input
                type="text"
                placeholder="e.g. Mike's March Madness"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                maxLength={30}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">{groupName.length}/30</p>
            </div>

            <div>
              <label className="font-body text-xs text-muted-foreground mb-2 block">Pick an Emoji</label>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-2 rounded-xl transition-all ${
                      selectedEmoji === emoji
                        ? "bg-primary/20 border-2 border-primary scale-110"
                        : "bg-card border border-border hover:bg-accent"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCreate}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-xl tracking-wider glow-orange"
            >
              CREATE GROUP
            </motion.button>
          </motion.div>
        )}

        {/* Create Success */}
        {mode === "create" && createdCode && (
          <motion.div
            key="create-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-5xl mb-2">🎉</div>
            <p className="font-body text-sm text-muted-foreground">Your group code is</p>
            <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <span className="font-display text-2xl tracking-widest text-foreground">{createdCode}</span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-body text-xs"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-muted-foreground font-body">Share this code with friends to invite them!</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDone}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-xl tracking-wider glow-orange"
            >
              DONE
            </motion.button>
          </motion.div>
        )}

        {/* Join Mode */}
        {mode === "join" && (
          <motion.div
            key="join-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="font-body text-xs text-muted-foreground mb-1 block">Invite Code</label>
              <input
                type="text"
                placeholder="e.g. MARCH-7X4K"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-display text-lg tracking-widest placeholder:text-muted-foreground placeholder:font-body placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-primary text-center"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleJoin}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-xl tracking-wider glow-orange"
            >
              JOIN GROUP
            </motion.button>
          </motion.div>
        )}

        <button
          onClick={() => navigate("/leaderboard")}
          className="w-full text-center text-muted-foreground font-body text-sm underline mt-6"
        >
          Back to Leaderboard
        </button>
      </motion.div>
    </div>
  );
};

export default CreateGroup;
