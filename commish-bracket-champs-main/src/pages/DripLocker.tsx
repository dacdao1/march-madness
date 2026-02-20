import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DRIP_ITEMS, DripItem } from "@/data/mockData";
import dripSweats from "@/assets/drip-sweats.png";
import dripFoamFinger from "@/assets/drip-foam-finger.png";
import dripShoes from "@/assets/drip-shoes.png";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RARITY_COLORS: Record<string, string> = {
  common: "border-muted-foreground/30",
  rare: "border-secondary/50",
  epic: "border-drip-purple/50",
  legendary: "border-drip-gold/50",
};

const RARITY_LABELS: Record<string, string> = {
  common: "Common",
  rare: "Rare 💎",
  epic: "Epic 🔮",
  legendary: "Legendary 👑",
};

const DRIP_IMAGES: Record<string, string> = {
  "1": dripSweats,
  "2": dripShoes,
  "3": dripFoamFinger,
  "4": dripShoes,
  "5": dripSweats,
  "6": dripShoes,
  "7": dripFoamFinger,
  "8": dripShoes,
};

const getRarityFromPct = (pct?: number): string => {
  if (!pct) return "common";
  if (pct < 10) return "legendary";
  if (pct < 25) return "epic";
  if (pct < 40) return "rare";
  return "common";
};

const DripLocker = () => {
  const navigate = useNavigate();
  const items = DRIP_ITEMS.slice(0, 8);
  const earnedCount = items.filter((d) => d.earned).length;
  const [selectedItem, setSelectedItem] = useState<DripItem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-court px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-3xl text-foreground">🔥 DRIP LOCKER</h1>
        <span className="font-body text-sm text-muted-foreground">
          {earnedCount}/{items.length}
        </span>
      </div>
      <p className="text-xs text-muted-foreground font-body mb-6">
        Correct picks earn drip. Rare upsets = rarer gear.
      </p>

      {/* Drip Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {items.map((item, i) => {
          const computedRarity = item.pickPct !== undefined ? getRarityFromPct(item.pickPct) : item.rarity;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className={`relative p-4 rounded-2xl border-2 cursor-pointer ${RARITY_COLORS[computedRarity]} ${
                item.earned ? "bg-card" : "bg-muted/30"
              }`}
            >
              {!item.earned && (
                <div className="absolute inset-0 rounded-2xl bg-background/60 backdrop-blur-sm flex items-center justify-center z-10 pointer-events-none">
                  <span className="text-2xl">🔒</span>
                </div>
              )}
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {DRIP_IMAGES[item.id] ? (
                    <img src={DRIP_IMAGES[item.id]} alt={item.name} className="h-16 w-16 object-contain" />
                  ) : (
                    <span className="text-4xl">{item.emoji}</span>
                  )}
                </div>
                <p className="font-body text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.team}</p>
                <span className={`inline-block mt-1 text-[10px] font-body px-2 py-0.5 rounded-full ${
                  computedRarity === "legendary" ? "bg-drip-gold/20 text-drip-gold" :
                  computedRarity === "epic" ? "bg-drip-purple/20 text-drip-purple" :
                  computedRarity === "rare" ? "bg-secondary/20 text-secondary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {RARITY_LABELS[computedRarity]}
                </span>
                {item.pickPct !== undefined && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {item.pickPct}% of users
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* New dual CTAs */}
      <div className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.open("https://apps.apple.com/us/app/takes/id1633475437", "_blank", "noopener,noreferrer")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display text-lg tracking-wider glow-orange"
        >
          🌍 JOIN WORLD CUP EARLY ACCESS
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.open("https://apps.apple.com/us/app/takes/id1633475437", "_blank", "noopener,noreferrer")}
          className="w-full py-4 rounded-2xl bg-secondary text-secondary-foreground font-display text-lg tracking-wider glow-blue"
        >
          ⛳ UNLOCK MASTERS BRACKET
        </motion.button>
      </div>

      {/* Item Detail Drawer */}
      <Drawer open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DrawerContent>
          {selectedItem && (() => {
            const computedRarity = selectedItem.pickPct !== undefined ? getRarityFromPct(selectedItem.pickPct) : selectedItem.rarity;
            return (
              <>
                <DrawerHeader className="text-center">
                  {DRIP_IMAGES[selectedItem.id] ? (
                    <img src={DRIP_IMAGES[selectedItem.id]} alt={selectedItem.name} className="h-20 w-20 object-contain mx-auto mb-2" />
                  ) : (
                    <span className="text-5xl mb-2 block">{selectedItem.emoji}</span>
                  )}
                  <DrawerTitle className="font-display text-2xl">{selectedItem.name}</DrawerTitle>
                  <div className="flex justify-center mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-body ${
                      computedRarity === "legendary" ? "bg-drip-gold/20 text-drip-gold" :
                      computedRarity === "epic" ? "bg-drip-purple/20 text-drip-purple" :
                      computedRarity === "rare" ? "bg-secondary/20 text-secondary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {RARITY_LABELS[computedRarity]}
                    </span>
                  </div>
                  <DrawerDescription className="font-body mt-2">
                    {selectedItem.pickPct !== undefined
                      ? `Earned by only ${selectedItem.pickPct}% of Takes users 🔥`
                      : "Download Takes to secure your drip forever 🔐"}
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button
                    className="w-full font-display text-lg tracking-wider"
                    onClick={() => {
                      toast.success("Coming soon! 🚀");
                      setSelectedItem(null);
                    }}
                  >
                    📲 Download Takes
                  </Button>
                  <DrawerClose asChild>
                    <button className="text-sm text-muted-foreground font-body mt-1">Close</button>
                  </DrawerClose>
                </DrawerFooter>
              </>
            );
          })()}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DripLocker;
