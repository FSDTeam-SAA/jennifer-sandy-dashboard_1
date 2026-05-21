export interface MarketValueApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: MarketValueItem[];
}


export interface MarketValueItem {
  _id: string;
  gk: GKUser;
  marketValue: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface GKUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "gk";
  provider: string;
  profileImage: string;
  verified: boolean;

  position: string[];
  playingVideo: string[];

  isSubscription: boolean;
  subscription: string;
  subscriptionExpiry: string;

  createdAt: string;
  updatedAt: string;
  lastLogin: string;

  birthdayPlace: string;
  category: string;
  citizenship: string;
  currentClub: string;
  dob: string;

  foot: "left" | "right" | "both";
  gender: "male" | "female" | "other";

  gpa: string;
  hight: string;
  weight: string;

  inSchoolOrCollege: boolean;
  institute: string;
  schoolName: string;

  league: string;
  jerseyNumber: string;
  teamName: string;

  followers: string[];
  following: string[];

  age: number;

  socialMedia: SocialMedia[];

  agent: string;
  nationality: string;
  phone: string;
  phoneCode: string;

  __v: number;
}


export interface SocialMedia {
  _id: string;
  name: string;
  url: string;
}


