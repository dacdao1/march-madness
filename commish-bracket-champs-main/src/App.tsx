import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import MatchupScreen from "./pages/MatchupScreen";
import Congrats from "./pages/Congrats";
import ShareScreen from "./pages/ShareScreen";
import Leaderboard from "./pages/Leaderboard";
import BracketTracker from "./pages/BracketTracker";
import DripLocker from "./pages/DripLocker";
import ScoreUpdates from "./pages/ScoreUpdates";
import AccountCreation from "./pages/AccountCreation";
import CreateGroup from "./pages/CreateGroup";
import RoundRecap from "./pages/RoundRecap";
import EndOfTournament from "./pages/EndOfTournament";
import BottomNav from "./components/BottomNav";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const HIDE_NAV_ROUTES = ["/", "/congrats", "/share", "/account", "/groups/new", "/recap", "/end"];

const AppContent = () => {
  const location = useLocation();
  const showNav = !HIDE_NAV_ROUTES.includes(location.pathname);

  return (
    <div className="max-w-lg mx-auto relative">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/matchup" element={<MatchupScreen />} />
        <Route path="/congrats" element={<Congrats />} />
        <Route path="/share" element={<ShareScreen />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/bracket" element={<BracketTracker />} />
        <Route path="/drip" element={<DripLocker />} />
        <Route path="/scores" element={<ScoreUpdates />} />
        <Route path="/account" element={<AccountCreation />} />
        <Route path="/groups/new" element={<CreateGroup />} />
        <Route path="/recap" element={<RoundRecap />} />
        <Route path="/end" element={<EndOfTournament />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNav && <BottomNav />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
