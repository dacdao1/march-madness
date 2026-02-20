
# March Madness Prototype — Comprehensive Product Upgrade Plan

This plan covers all 9 improvement areas across the existing prototype. The changes are purely frontend/mock-data-driven (no backend needed), following the existing React + Framer Motion + Tailwind patterns throughout.

---

## Scope at a Glance

```text
Files Modified:        src/data/mockData.ts, all 8 page files, Commish.tsx, BottomNav.tsx
New Files Created:     src/pages/RoundRecap.tsx, src/pages/EndOfTournament.tsx
App.tsx routes added:  /recap, /end
```

---

## 1. Bracket Structure (Landing + Onboarding)

**What changes:** Landing.tsx gets a bracket-mode selector before PLAY begins.

- After tapping PLAY, show a two-card modal/overlay:
  - **Classic Full Bracket** — pick all 63 games upfront
  - **Round-by-Round Mode** — pick only the current round; next round unlocks after tip-off
- Selection is stored in React state and passed via navigation state to MatchupScreen
- MatchupScreen reads the mode and shows a **"Next Round Opens In X Hours" banner** between rounds (static countdown using mock time data)
- **Lock state**: picks from other players in BracketTracker are hidden until a `GAMES_STARTED` flag in mockData is true (currently false by default, simulating pre-tip-off)

**mockData.ts additions:**
```ts
export const GAMES_STARTED = false; // flip to true for live mode
export const NEXT_ROUND_OPENS_IN = "14 hours";
export const BRACKET_MODE_OPTIONS = ["Classic Full Bracket", "Round-by-Round Mode"];
```

---

## 2. Matchup Screen Enhancements (MatchupScreen.tsx + Commish.tsx)

**What changes:**

### Team Header
- Add seed number next to team name: `(1) DUKE` vs `(16) VERMONT`
- Add label pill below each name:
  - Seed 1–3: **Favorite** (green pill)
  - Seed 4–8: **Underdog** (yellow pill)
  - Seed 9–16: **Strong Underdog** (red pill)
- Show pick percentage split bar: `74% → 26%` with animated width fill

**mockData.ts additions per matchup:**
```ts
pickPercentA: 74,  // % of users picking team A
pickPercentB: 26,
```

### Post-Pick Rarity Reveal
Replace the current "LOCKED IN!" overlay with a two-stage reveal:
1. Stage 1 (0–1s): "LOCKED IN!" checkmark (existing)
2. Stage 2 (1–2s): Rarity badge slides in below — "Only 26% picked this 🔥" or "Popular pick — 74% agreed"
- Rarity tiers: `<10%` = Legendary, `10–25%` = Epic, `25–40%` = Rare, `>40%` = Common

### Animation Reduction (Commish.tsx)
- Remove the looping `scale/rotate` animation on the top GIF (currently bouncing on repeat Infinity)
- Keep the `animate={{ opacity: 1, x: 0 }}` fade-in only — no bounce, no scale pulse
- Bullet points: already fade in via `opacity: 0 → 1` — keep this, remove the x-slide on bullets

### Team Logo/Jersey Placeholder
- Add a colored jersey icon (using the team's `color` from mockData) in a small circle badge in the top-left of each Commish card

---

## 3. Leaderboard Redesign (Leaderboard.tsx)

The tab structure already exists (Friends / Groups / Campuses / Global). Enhancements:

### All Tabs
- **Highlight user row** — already done for Friends and Global; apply same `bg-primary/10 border-primary/30` to campus and groups rows where `name === "You"`

### Friends Tab
- Add **rank movement arrow** next to rank number: `↑2` (green) or `↓1` (red) or `—` (gray)
- Add `% of group who picked same outcome` below correct picks count

**mockData.ts additions:**
```ts
rankChange: +2  // added to LeaderboardEntry interface
groupPickSamePct: 68  // % of group who agreed with this pick
```

### Groups Tab
- Clicking a group opens a **drill-down drawer** (same pattern as campus drawer) showing:
  - Group members list with individual scores
  - Top pick agreements
  - Group rank vs global

### Campus Tab
- Add **aggregate progress bar** below each campus row showing `avgPoints / 120` (max expected score) as a colored fill
- Show **top 5 players per campus** in an expandable accordion below the progress bar
- Add campus vs campus "rivalry meter" — a split bar between rank 1 and rank 2 campuses at the top of the tab

**mockData.ts additions:**
```ts
topPlayers: [{ name, points, avatar }]  // per campus entry
```

### Global Tab
- Rank movement arrows already specced — add `rankChange` field to `GLOBAL_LEADERBOARD` entries

---

## 4. Round Recap Screen (NEW: src/pages/RoundRecap.tsx)

New route: `/recap`

**UI layout:**
```text
[ ROUND RECAP ]
[ Round of 64 Complete ]

🎯 Upsets Hit
  Vermont nearly did it — 74% missed this one

📊 Your Group
  68% of your group got Kentucky right

🤯 Biggest Anomaly
  Only 7% picked UConn to win by <10

🏫 Campus Shift
  Penn Quakers moved from #3 → #1 this round
```

- All data is static mock (no notifications, in-experience only)
- Accessible via a persistent "Round Recap" pill banner on BracketTracker and ScoreUpdates pages
- CTA at bottom: "See Full Bracket" → /bracket, "Check Leaderboard" → /leaderboard

**mockData.ts additions:**
```ts
export const ROUND_RECAP = {
  round: "Round of 64",
  upsets: [...],
  groupCorrectPct: 68,
  biggestAnomaly: "...",
  campusShift: { group: "Penn Quakers", from: 3, to: 1 }
}
```

---

## 5. Drip & Trophies (DripLocker.tsx + mockData.ts)

### Rarity Based on Pick %
- Update `DRIP_ITEMS` to include `pickPct` field
- Display rarity calculation: `pickPct < 10%` = Legendary, etc.
- Show "Earned by only X% of Takes users" line in item detail drawer

### New Trophy Items
Add 3 new items to `DRIP_ITEMS`:
```ts
{ id: "9", name: "Group MVP Trophy", rarity: "epic", pickPct: 18 }
{ id: "10", name: "Campus Champion Banner", rarity: "legendary", pickPct: 5 }
{ id: "11", name: "Top 5% Global Badge", rarity: "legendary", pickPct: 4 }
```

### CTA Replacement
Replace the "SAVE YOUR DRIP" button with two stacked CTAs:
```text
[ 🌍 JOIN WORLD CUP EARLY ACCESS ]   → App Store link
[ ⛳ UNLOCK MASTERS BRACKET ]         → App Store link
```

Both use `window.open("https://apps.apple.com/us/app/takes/id1633475437", "_blank")`

---

## 6. Campus Competition (Leaderboard.tsx campus tab)

Already planned in section 3. Additional specifics:

- **Campus vs Campus progress meter**: A horizontal split bar at top of campus tab showing `#1 Penn Quakers` vs `#2 Oregon Ducks` with animated width percentages
- **"Your Campus Rank" badge**: A persistent orange pill `🏫 Penn #1` displayed in the campus tab header when a campus is joined (reads from `joinedCampus` state)
- **Campus team highlight**: In ScoreUpdates, if a game involves a team matching the user's campus, show a `⭐ Your Campus` badge on that score card

---

## 7. Live Mode (MatchupScreen.tsx + BracketTracker.tsx)

Controlled by `GAMES_STARTED` flag in mockData.

**When `GAMES_STARTED = true`:**
- BracketTracker shows a banner: `🔒 BRACKET LOCKED — Games are live!`
- A `UPSET_ALERT` banner appears at the top of MatchupScreen/ScoreUpdates: `🚨 UPSET ALERT: Vermont leads Duke 38-30 at half`
- Rank movement numbers animate in on Leaderboard with a subtle `opacity: 0 → 1` fade (no bouncing)
- Campus leaderboard shows `↑` / `↓` shift icons next to rank numbers
- Motion stays minimal: only fade-in transitions, no spring bounces in live mode

**mockData.ts additions:**
```ts
export const GAMES_STARTED = false;
export const UPSET_ALERT = "Vermont leads Duke 38-30 at half 🚨";
```

---

## 8. Sharing Flow (ShareScreen.tsx + Congrats.tsx)

### Revised Flow
```text
Pick → Congrats (Bracket Summary) → Share Screen
```

**Congrats.tsx** becomes a summary screen:
- Show a mini bracket summary: list of picks with team names (passed via navigation state `picks` array — already implemented)
- Show a "Your picks are in" confirmation card with the pick count
- Primary CTA: "SHARE YOUR BRACKET" → /share
- Remove "CHALLENGE A GROUP" button (replaced by sharing flow)

**ShareScreen.tsx** cleanup:
- Keep: iMessage button, Snapchat button, copy link
- Remove: any Instagram/TikTok buttons (none currently exist — confirmed clean)
- Add a bracket summary preview card at the top of the share screen showing the user's picks (from navigation state)
- SMS sharing already uses `sms:` protocol — keep as-is
- Snapchat already uses clipboard copy — keep as-is

---

## 9. App Conversion (End-of-Tournament Screen)

New route: `/end` → `src/pages/EndOfTournament.tsx`

**Trigger:** Add a "Tournament Over" CTA on Congrats.tsx for the prototype (simulating end state).

**EndOfTournament.tsx layout:**
```text
🏆 TOURNAMENT OVER

You finished #42 globally
Top 15% • 12 correct picks

[ 🌍 UNLOCK WORLD CUP BRACKET ]
[ ⛳ JOIN MASTERS WAITLIST ]
[ 📲 GET EARLY ACCESS IN APP ]

All three buttons → App Store link
```

- Drip items earned summary shown above CTAs
- No account creation gate — pure conversion to app

---

## Technical Implementation Order

The changes will be made in this sequence to avoid dependency issues:

```text
1. mockData.ts         — add all new fields (pickPct, rankChange, etc.)
2. Commish.tsx         — reduce animation intensity
3. MatchupScreen.tsx   — seeds, labels, pick %, rarity reveal, mode toggle
4. Landing.tsx         — bracket mode selector overlay
5. BracketTracker.tsx  — lock state, recap banner, live mode banner
6. Leaderboard.tsx     — rank arrows, group drill-down, campus progress bar, rivalry meter
7. DripLocker.tsx      — rarity from pickPct, new trophies, new CTAs
8. Congrats.tsx        — bracket summary, revised CTA flow
9. ShareScreen.tsx     — bracket preview card
10. ScoreUpdates.tsx   — campus highlight badge, upset alert banner
11. NEW RoundRecap.tsx — full recap screen
12. NEW EndOfTournament.tsx — app conversion screen
13. App.tsx            — add /recap and /end routes
14. BottomNav.tsx      — hide nav on /recap and /end
```

---

## New Screen Inventory

| Screen | Route | Status |
|---|---|---|
| Landing | / | Modified |
| Matchup Screen | /matchup | Modified |
| Congrats | /congrats | Modified |
| Share Screen | /share | Modified |
| Leaderboard | /leaderboard | Modified |
| Bracket Tracker | /bracket | Modified |
| Drip Locker | /drip | Modified |
| Score Updates | /scores | Modified |
| Round Recap | /recap | NEW |
| End of Tournament | /end | NEW |
