export interface UserProfileApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}


export interface UserProfile {
  user: User;
  reports: Report[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user" | string;
  provider: "credentials" | "google" | string;
  profileImage: string;
  verified: boolean;

  position: string[];
  socialMedia: SocialMedia[];
  playingVideo: string[];

  isSubscription: boolean;
  accessLavel: string;
  joiningDate: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  address : string;
  birthdayPlace: string;
  category: string;
  citizenship: string;
  currentClub: string;
  dob: string;

  foot: "right" | "left" | "both" | string;
  gender: "male" | "female" | "other" | string;

  gpa: string;
  hight: string;
  weight: string;

  inSchoolOrCollege: boolean;
  institute: string;
  league: string;

  __v: number;
}

export interface SocialMedia {
  platform?: string;
  url?: string;
}



// export interface UserProfile {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role: "admin" | "user";
//   profileImage: string;
//   verified: boolean;
//   league: string | null;
//   category: string | null;
//   position: string[];
//   socialMedia: SocialMedia[];
//   playingVideo: string[];
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   __v: number;
//   otp: string;
//   otpExpiry: string; // ISO date string
// }

// export interface SocialMedia {
//   platform?: string;
//   url?: string;
// }
