export interface Team {
  name: string;
  seed: number;
  mascot: string;
  record: string;
  conference: string;
  color: string;
}

export interface Matchup {
  id: number;
  round: string;
  teamA: Team;
  teamB: Team;
  pickPercentA: number;
  pickPercentB: number;
  commishA: {
    name: string;
    emoji: string;
    points: string[];
  };
  commishB: {
    name: string;
    emoji: string;
    points: string[];
  };
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  correctPicks: number;
  drip: number;
  rankChange?: number;
  groupPickSamePct?: number;
}

export interface DripItem {
  id: string;
  name: string;
  team: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  emoji: string;
  image?: string;
  earned: boolean;
  pickPct?: number;
}

export interface TopPlayer {
  name: string;
  points: number;
  avatar: string;
}

export interface CampusEntry {
  rank: number;
  group: string;
  emoji: string;
  members: number;
  totalPoints: number;
  avgPoints: number;
  topPlayers: TopPlayer[];
}

export interface GroupEntry {
  rank: number;
  name: string;
  emoji: string;
  members: number;
  totalPoints: number;
  avgPoints: number;
  memberDetails: { name: string; avatar: string; points: number; correctPicks: number }[];
}

// Live mode flag — flip to true when games begin
export const GAMES_STARTED = false;
export const UPSET_ALERT = "Vermont leads Duke 38-30 at half 🚨";
export const NEXT_ROUND_OPENS_IN = "14 hours";
export const BRACKET_MODE_OPTIONS = ["Classic Full Bracket", "Round-by-Round Mode"] as const;

export const ROUND_RECAP = {
  round: "Round of 64",
  upsets: [
    { team: "Vermont", opponent: "Duke", missedByPct: 74, description: "Vermont nearly did it — 74% missed this one" },
    { team: "New Mexico", opponent: "UConn", missedByPct: 61, description: "New Mexico pushed UConn to the wire — 61% got burned" },
  ],
  groupCorrectPct: 68,
  groupTeam: "Kentucky",
  biggestAnomaly: "Only 7% picked UConn to win by fewer than 10 points",
  campusShift: { group: "Penn Quakers", emoji: "🔴", from: 3, to: 1 },
};

export const MATCHUPS: Matchup[] = [
  {
    id: 1,
    round: "Round of 64",
    pickPercentA: 74,
    pickPercentB: 26,
    teamA: { name: "Duke", seed: 1, mascot: "Blue Devils", record: "29-3", conference: "ACC", color: "#003087" },
    teamB: { name: "Vermont", seed: 16, mascot: "Catamounts", record: "24-8", conference: "America East", color: "#006633" },
    commishA: {
      name: "Coach Blaze",
      emoji: "🔥",
      points: [
        "Duke's freshmen are BUILT different — three top-10 recruits who live for March",
        "Coach K's legacy lives on — this program has more Final Four trips than your school has wins",
        "Their defense is suffocating — opponents shoot 38% against them. Good luck, Vermont 🥶"
      ],
    },
    commishB: {
      name: "Ice Cold Carl",
      emoji: "🧊",
      points: [
        "Vermont has won 17 STRAIGHT. That's not a team, that's a freight train with no brakes 🚂",
        "Their senior point guard averages 8 assists — he's been here before and he's not scared",
        "Everyone picked Duke. But you're not everyone, are you? 👀 Upset alert!"
      ],
    },
  },
  {
    id: 2,
    round: "Round of 64",
    pickPercentA: 62,
    pickPercentB: 38,
    teamA: { name: "Kentucky", seed: 4, mascot: "Wildcats", record: "25-7", conference: "SEC", color: "#0033A0" },
    teamB: { name: "Oregon", seed: 13, mascot: "Ducks", record: "23-9", conference: "Pac-12", color: "#154733" },
    commishA: {
      name: "Coach Blaze",
      emoji: "🔥",
      points: [
        "Kentucky's big man is a MONSTER — 18 pts, 11 boards, and he blocks shots like it's personal",
        "Rupp Arena raised these boys. The SEC tournament was just a warm-up 💪",
        "BBN travels DEEP. Oregon's gonna feel like the away team in their own region"
      ],
    },
    commishB: {
      name: "Ice Cold Carl",
      emoji: "🧊",
      points: [
        "Oregon's 3-point shooting is top 10 nationally. They'll light Kentucky UP from deep 🎯",
        "The Ducks run in transition like they stole something — Kentucky can't keep up",
        "Phil Knight didn't invest billions in Nike for Oregon to lose in the first round 😤"
      ],
    },
  },
  {
    id: 3,
    round: "Round of 64",
    pickPercentA: 81,
    pickPercentB: 19,
    teamA: { name: "UConn", seed: 2, mascot: "Huskies", record: "28-4", conference: "Big East", color: "#000E2F" },
    teamB: { name: "New Mexico", seed: 15, mascot: "Lobos", record: "22-10", conference: "MWC", color: "#BA0C2F" },
    commishA: {
      name: "Coach Blaze",
      emoji: "🔥",
      points: [
        "UConn just won back-to-back titles. You think they're done? They're HUNGRY for a three-peat 🏆",
        "Their depth is insane — 9 players averaging 20+ minutes. Fresh legs all game long",
        "The Huskies play defense like they're guarding their lunch money. Nobody eats."
      ],
    },
    commishB: {
      name: "Ice Cold Carl",
      emoji: "🧊",
      points: [
        "New Mexico's altitude training is real — their players literally have more oxygen capacity 🫁",
        "The Lobos' guard play is electric — fastest backcourt in the Mountain West",
        "15-seeds upset 2-seeds every year. EVERY. YEAR. History is on the Lobos' side 📊"
      ],
    },
  },
  {
    id: 4,
    round: "Round of 64",
    pickPercentA: 55,
    pickPercentB: 45,
    teamA: { name: "Gonzaga", seed: 3, mascot: "Bulldogs", record: "27-5", conference: "WCC", color: "#002967" },
    teamB: { name: "Penn", seed: 14, mascot: "Quakers", record: "21-9", conference: "Ivy League", color: "#011F5B" },
    commishA: {
      name: "Coach Blaze",
      emoji: "🔥",
      points: [
        "Gonzaga has been to the last 25 tournaments. That's not a program, that's a DYNASTY 👑",
        "Their international pipeline produces NBA talent every year — this team has future pros",
        "The Bulldogs shoot 50% from the field. Half the time, the ball goes in. Every. Time."
      ],
    },
    commishB: {
      name: "Ice Cold Carl",
      emoji: "🧊",
      points: [
        "Penn's Ivy League smarts extend to the court — their offensive efficiency is TOP 20 nationally 🧠",
        "The Quakers have a chip on their shoulder the size of the Liberty Bell",
        "Nobody expects Penn. And that's EXACTLY why they'll win. The bracket needs chaos! 🌪️"
      ],
    },
  },
];

export const FRIEND_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "You", avatar: "😎", points: 320, correctPicks: 12, drip: 5, rankChange: 2, groupPickSamePct: 72 },
  { rank: 2, name: "Cosmo Kramer", avatar: "🤪", points: 290, correctPicks: 11, drip: 4, rankChange: -1, groupPickSamePct: 68 },
  { rank: 3, name: "Sarah B.", avatar: "🔥", points: 260, correctPicks: 10, drip: 3, rankChange: 0, groupPickSamePct: 65 },
  { rank: 4, name: "Mike T.", avatar: "🏀", points: 220, correctPicks: 8, drip: 2, rankChange: -1, groupPickSamePct: 54 },
  { rank: 5, name: "Jess R.", avatar: "💪", points: 180, correctPicks: 7, drip: 1, rankChange: 0, groupPickSamePct: 48 },
];

export const CAMPUS_LEADERBOARD: CampusEntry[] = [
  {
    rank: 1, group: "Penn Quakers", emoji: "🔴", members: 147, totalPoints: 12400, avgPoints: 84,
    topPlayers: [
      { name: "Alex M.", points: 340, avatar: "🎓" },
      { name: "Jordan K.", points: 315, avatar: "📚" },
      { name: "Riley S.", points: 290, avatar: "🦅" },
      { name: "Casey L.", points: 275, avatar: "🏀" },
      { name: "Morgan P.", points: 260, avatar: "🎯" },
    ],
  },
  {
    rank: 2, group: "Oregon Ducks", emoji: "🦆", members: 132, totalPoints: 11200, avgPoints: 85,
    topPlayers: [
      { name: "Tyler B.", points: 380, avatar: "🦆" },
      { name: "Sam C.", points: 330, avatar: "🌲" },
      { name: "Drew F.", points: 305, avatar: "🏔️" },
      { name: "Parker G.", points: 280, avatar: "🎮" },
      { name: "Quinn H.", points: 255, avatar: "🎵" },
    ],
  },
  {
    rank: 3, group: "Texas Longhorns", emoji: "🤘", members: 198, totalPoints: 15800, avgPoints: 80,
    topPlayers: [
      { name: "Austin R.", points: 360, avatar: "🤘" },
      { name: "Tex W.", points: 335, avatar: "🌵" },
      { name: "Lone S.", points: 310, avatar: "⭐" },
      { name: "Bevo T.", points: 285, avatar: "🐂" },
      { name: "Hook E.", points: 260, avatar: "🎸" },
    ],
  },
  {
    rank: 4, group: "Michigan Wolverines", emoji: "〽️", members: 165, totalPoints: 12800, avgPoints: 78,
    topPlayers: [
      { name: "Maize B.", points: 350, avatar: "〽️" },
      { name: "Blue C.", points: 325, avatar: "🏈" },
      { name: "Ann A.", points: 300, avatar: "📖" },
      { name: "Wolver D.", points: 275, avatar: "🐺" },
      { name: "Go Blue E.", points: 250, avatar: "💛" },
    ],
  },
  {
    rank: 5, group: "UCLA Bruins", emoji: "🐻", members: 121, totalPoints: 9200, avgPoints: 76,
    topPlayers: [
      { name: "Bruin A.", points: 330, avatar: "🐻" },
      { name: "Sunset B.", points: 305, avatar: "🌅" },
      { name: "Westwood C.", points: 280, avatar: "🏄" },
      { name: "Pacific D.", points: 255, avatar: "🌊" },
      { name: "Gold E.", points: 230, avatar: "⭐" },
    ],
  },
];

export const CUSTOM_GROUP_LEADERBOARD: GroupEntry[] = [
  {
    rank: 1, name: "Mike's March Madness", emoji: "🎯", members: 6, totalPoints: 2400, avgPoints: 400,
    memberDetails: [
      { name: "Mike D.", avatar: "🎯", points: 480, correctPicks: 18 },
      { name: "Sarah T.", avatar: "🔥", points: 420, correctPicks: 16 },
      { name: "Jay R.", avatar: "🏀", points: 400, correctPicks: 15 },
      { name: "You", avatar: "😎", points: 320, correctPicks: 12 },
      { name: "Kim L.", avatar: "💪", points: 290, correctPicks: 11 },
      { name: "Tom B.", avatar: "🤙", points: 240, correctPicks: 9 },
    ],
  },
  {
    rank: 2, name: "BAMTech Mafia", emoji: "💀", members: 8, totalPoints: 2100, avgPoints: 263,
    memberDetails: [
      { name: "Boss A.", avatar: "💀", points: 460, correctPicks: 17 },
      { name: "Code B.", avatar: "💻", points: 380, correctPicks: 14 },
      { name: "Dev C.", avatar: "🛠️", points: 350, correctPicks: 13 },
      { name: "You", avatar: "😎", points: 320, correctPicks: 12 },
      { name: "Stack D.", avatar: "📦", points: 250, correctPicks: 9 },
    ],
  },
  {
    rank: 3, name: "Hoops & Dreams", emoji: "✨", members: 5, totalPoints: 1800, avgPoints: 360,
    memberDetails: [
      { name: "Dream A.", avatar: "✨", points: 450, correctPicks: 17 },
      { name: "Hoop B.", avatar: "🏀", points: 390, correctPicks: 15 },
      { name: "Swish C.", avatar: "🎯", points: 360, correctPicks: 14 },
      { name: "Net D.", avatar: "🕸️", points: 340, correctPicks: 13 },
      { name: "Shot E.", avatar: "🎳", points: 310, correctPicks: 12 },
    ],
  },
  {
    rank: 4, name: "The Bracket Busters", emoji: "💥", members: 7, totalPoints: 1750, avgPoints: 250,
    memberDetails: [
      { name: "Bust A.", avatar: "💥", points: 440, correctPicks: 16 },
      { name: "Break B.", avatar: "🔨", points: 370, correctPicks: 14 },
      { name: "Crash C.", avatar: "💣", points: 340, correctPicks: 13 },
      { name: "You", avatar: "😎", points: 320, correctPicks: 12 },
    ],
  },
  {
    rank: 5, name: "Corner Three Club", emoji: "🎯", members: 4, totalPoints: 1400, avgPoints: 350,
    memberDetails: [
      { name: "Three A.", avatar: "3️⃣", points: 420, correctPicks: 16 },
      { name: "Corner B.", avatar: "📐", points: 390, correctPicks: 15 },
      { name: "Arc C.", avatar: "🌈", points: 360, correctPicks: 14 },
      { name: "Deep D.", avatar: "🎯", points: 330, correctPicks: 13 },
    ],
  },
];

export const GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "BracketKing2026", avatar: "👑", points: 480, correctPicks: 18, drip: 12, rankChange: 0 },
  { rank: 2, name: "MarchMadnessQueen", avatar: "👸", points: 460, correctPicks: 17, drip: 11, rankChange: 1 },
  { rank: 3, name: "CinderellaHunter", avatar: "🎃", points: 440, correctPicks: 16, drip: 9, rankChange: -1 },
  { rank: 42, name: "You", avatar: "😎", points: 320, correctPicks: 12, drip: 5, rankChange: 2 },
];

export const DRIP_ITEMS: DripItem[] = [
  { id: "1", name: "Duke Jersey", team: "Duke", rarity: "common", emoji: "👕", earned: true, pickPct: 74 },
  { id: "2", name: "Kentucky Kicks", team: "Kentucky", rarity: "rare", emoji: "👟", earned: true, pickPct: 38 },
  { id: "3", name: "UConn Championship Ring", team: "UConn", rarity: "epic", emoji: "💍", earned: true, pickPct: 19 },
  { id: "4", name: "Golden Basketball", team: "Global", rarity: "legendary", emoji: "🏀", earned: false, pickPct: 7 },
  { id: "5", name: "Vermont Beanie", team: "Vermont", rarity: "common", emoji: "🧢", earned: true, pickPct: 54 },
  { id: "6", name: "Oregon Shades", team: "Oregon", rarity: "rare", emoji: "🕶️", earned: false, pickPct: 32 },
  { id: "7", name: "Gonzaga Chain", team: "Gonzaga", rarity: "epic", emoji: "⛓️", earned: false, pickPct: 22 },
  { id: "8", name: "March Madness Trophy", team: "Global", rarity: "legendary", emoji: "🏆", earned: false, pickPct: 5 },
  { id: "9", name: "Group MVP Trophy", team: "Global", rarity: "epic", emoji: "🏅", earned: false, pickPct: 18 },
  { id: "10", name: "Campus Champion Banner", team: "Global", rarity: "legendary", emoji: "🎌", earned: false, pickPct: 5 },
  { id: "11", name: "Top 5% Global Badge", team: "Global", rarity: "legendary", emoji: "⭐", earned: false, pickPct: 4 },
];

export interface BracketGameDay {
  date: string;
  label: string;
  round: string;
  gamesCount: number;
  picks: { matchup: number; team: string; correct: boolean | null }[];
}

export const BRACKET_SCHEDULE: BracketGameDay[] = [
  {
    date: "Thursday, March 19",
    label: "Round of 64 — Day 1",
    round: "Round of 64",
    gamesCount: 16,
    picks: [
      { matchup: 0, team: "Duke", correct: true },
      { matchup: 1, team: "Oregon", correct: false },
    ],
  },
  {
    date: "Friday, March 20",
    label: "Round of 64 — Day 2",
    round: "Round of 64",
    gamesCount: 16,
    picks: [
      { matchup: 2, team: "UConn", correct: true },
      { matchup: 3, team: "Gonzaga", correct: true },
    ],
  },
  {
    date: "Saturday, March 21",
    label: "Round of 32 — Day 1",
    round: "Round of 32",
    gamesCount: 8,
    picks: [
      { matchup: 0, team: "Duke", correct: null },
    ],
  },
  {
    date: "Sunday, March 22",
    label: "Round of 32 — Day 2",
    round: "Round of 32",
    gamesCount: 8,
    picks: [
      { matchup: 2, team: "UConn", correct: null },
    ],
  },
  {
    date: "Thursday, March 26",
    label: "Sweet 16 — Day 1",
    round: "Sweet 16",
    gamesCount: 4,
    picks: [],
  },
  {
    date: "Friday, March 27",
    label: "Sweet 16 — Day 2",
    round: "Sweet 16",
    gamesCount: 4,
    picks: [],
  },
  {
    date: "Saturday, March 28",
    label: "Elite 8 — Day 1",
    round: "Elite 8",
    gamesCount: 2,
    picks: [],
  },
  {
    date: "Sunday, March 29",
    label: "Elite 8 — Day 2",
    round: "Elite 8",
    gamesCount: 2,
    picks: [],
  },
  {
    date: "Saturday, April 4",
    label: "Final Four",
    round: "Final Four",
    gamesCount: 2,
    picks: [],
  },
  {
    date: "Monday, April 6",
    label: "Championship",
    round: "Championship",
    gamesCount: 1,
    picks: [],
  },
];

export const FRIEND_BRACKET_PICKS: Record<string, { matchup: number; team: string; correct: boolean | null }[][]> = {
  "Cosmo Kramer": [
    [
      { matchup: 0, team: "Vermont", correct: false },
      { matchup: 1, team: "Kentucky", correct: true },
    ],
    [
      { matchup: 2, team: "New Mexico", correct: false },
      { matchup: 3, team: "Penn", correct: false },
    ],
    [{ matchup: 0, team: "Duke", correct: null }],
    [{ matchup: 2, team: "UConn", correct: null }],
    [], [], [], [], [], [],
  ],
  "Sarah B.": [
    [
      { matchup: 0, team: "Duke", correct: true },
      { matchup: 1, team: "Kentucky", correct: true },
    ],
    [
      { matchup: 2, team: "UConn", correct: true },
      { matchup: 3, team: "Gonzaga", correct: true },
    ],
    [{ matchup: 0, team: "Duke", correct: null }],
    [{ matchup: 2, team: "UConn", correct: null }],
    [], [], [], [], [], [],
  ],
};

export const SCORE_UPDATES = [
  {
    teamA: "Kentucky",
    scoreA: 85,
    teamB: "Oregon",
    scoreB: 77,
    status: "Final",
    campusTeam: "Oregon",
    narrative: "Kentucky's big man dominated the paint with 24 points and 13 rebounds. Oregon's 3-point shooting went cold in the second half — they shot just 2-for-14 from deep after halftime. BBN goes wild! 🔥",
  },
  {
    teamA: "Duke",
    scoreA: 92,
    scoreB: 58,
    teamB: "Vermont",
    status: "Final",
    campusTeam: null,
    narrative: "Duke's freshmen showed up and showed OUT. Vermont's 17-game win streak is done. The Blue Devils are dancing to the Round of 32! 😈",
  },
  {
    teamA: "UConn",
    scoreA: 71,
    scoreB: 65,
    teamB: "New Mexico",
    status: "Final",
    campusTeam: null,
    narrative: "The Lobos made it interesting! New Mexico hung tough until the final 3 minutes, but UConn's championship DNA kicked in. The three-peat dream lives on... barely. 😮‍💨",
  },
];
