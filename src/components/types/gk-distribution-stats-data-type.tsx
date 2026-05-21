export interface GkDistributionStatsApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: GkDistributionStats[];
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}


export interface GkDistributionStats {
  _id: string;
  gk: GkUser;
  keyPasses: number;
  mediumRangePasses: number;
  passes: number;
  shortPasses: number;
  passesInFinalThird: number;
  passesForward: number;
  passesInMiddleThird: number;
  passesSideways: number;
  passesInDefensiveThird: number;
  passesReceived: number;
  longPasses: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
}


export interface GkUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "gk";
  profileImage: string;
  verified: boolean;
  socialMedia: string[];
  playingVideo: string[];
  isSubscription: boolean;
  subscription: string | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  position: string[];
  provider: "google" | "credentials";
  __v: number;
}


