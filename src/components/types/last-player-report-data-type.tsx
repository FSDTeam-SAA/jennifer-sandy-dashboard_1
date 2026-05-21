// Root API response
export interface PlayerReportApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: PlayerReport[];
}

// Pagination meta
export interface Meta {
  total: number;
  page: number;
  limit: number;
}

// Single player report
export interface PlayerReport {
  _id: string;
  player: Player;
  date: string;
  category: string;
  gameTitle: string;
  rating: number;
  position: string[];
  minutesPlayed: number;
  deFensiveSummary: string;
  strengths: string;
  offensiveSummary: string;
  weaknesses: string;
  distributionSummary: string;
  generalComments: string;
  numberOfGames?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Player info
export interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "player";
  profileImage: string;
  verified: boolean;
  socialMedia: string[];
  playingVideo: string[];
  isSubscription: boolean;
  subscription: string;
  accessLavel: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  subscriptionExpiry: string;
  agent: string;
  birthdayPlace: string;
  category: string;
  citizenship: string;
  currentClub: string;
  dob: string;
  foot: "left" | "right";
  gender: "male" | "female" | "other";
  hight: string;
  inSchoolOrCollege: boolean;
  league: string;
  phone: string;
  weight: string;
  position: string[];
  teamName: string;
  gpa: string;
  institute: string;
  provider: "google" | "credentials";
}
