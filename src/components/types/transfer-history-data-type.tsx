

export interface TransferHistoryApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: TransferHistory[];
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}


export interface TransferHistory {
  _id: string;
  player: Player;
  season: string;
  date: string; // ISO date string
  leftClubName: string;
  leftClub: string; // image URL
  leftCountery: string; // image URL
  joinedclubName: string;
  joinedClub: string; // image URL
  joinedCountery: string; // image URL
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "player" | string;
  profileImage: string;
  verified: boolean;

  socialMedia: string[];
  playingVideo: string[];

  isSubscription: boolean;
  subscription: string;
  accessLavel: string[];

  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  subscriptionExpiry: string;

  agent: string;
  birthdayPlace: string;
  category: string;
  citizenship: string;
  currentClub: string;
  dob: string;

  foot: "left" | "right" | string;
  gender: "male" | "female" | string;

  hight: string;
  weight: string;

  inSchoolOrCollege: boolean;
  league: string;
  phone: string;

  position: string[];
  teamName: string;
  gpa: string;
  institute: string;
  provider: "google" | "credentials" | string;

  __v: number;
}


