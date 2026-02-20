import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AccountCreation = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen bg-gradient-court flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-5xl mb-4">💾</div>
        <h1 className="font-display text-4xl text-foreground mb-2">SAVE YOUR DRIP</h1>
        <p className="text-muted-foreground font-body text-sm max-w-xs">
          Create an account to keep your bracket, drip, and challenge friends anytime
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs"
      >
        {/* Toggle */}
        <div className="flex gap-1 bg-card rounded-xl p-1 mb-4 border border-border">
          {(["email", "phone"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 rounded-lg font-body text-sm transition-all ${
                method === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "email" ? "📧 Email" : "📱 Phone"}
            </button>
          ))}
        </div>

        <input
          type={method === "email" ? "email" : "tel"}
          placeholder={method === "email" ? "your@email.com" : "(555) 123-4567"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-xl tracking-wider glow-orange"
        >
          SAVE & JOIN
        </motion.button>

        <button
          onClick={() => navigate("/drip")}
          className="w-full text-center text-muted-foreground font-body text-sm underline mt-4"
        >
          Maybe later
        </button>
      </motion.div>
    </div>
  );
};

export default AccountCreation;
