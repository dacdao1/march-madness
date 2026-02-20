import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { path: "/", label: "Home", emoji: "🏠" },
  { path: "/matchup", label: "Pick", emoji: "🏀" },
  { path: "/bracket", label: "Bracket", emoji: "📊" },
  { path: "/leaderboard", label: "Board", emoji: "🏆" },
  { path: "/drip", label: "Drip", emoji: "🔥" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around py-2 px-1 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-0.5 py-1 px-3"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="text-xl">{item.emoji}</span>
              <span className={`text-[10px] font-body ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
