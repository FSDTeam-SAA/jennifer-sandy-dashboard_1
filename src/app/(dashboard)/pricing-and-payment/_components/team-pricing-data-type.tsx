export interface TeamRevenueApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: RevenueData;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}


export interface RevenueData {
  totalRevenue: number;
  totalPayments: number;
  data: Payment[];
}


export interface Payment {
  user: User;
  paymentId: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  paymentType: "TeamGame" | "IndividualGame";
  stripeSessionId: string;
  stripePaymentIntentId: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  team: Team;
  subscription: Subscription;
}


export interface User {
  name: string;
}

export interface Team {
  id: string;
  teamName: string;
  coachName: string;
  category: string;
  league: string;
  coachEmail: string;
  players: Player[];
  createdAt: string; // ISO date
}

export interface Player {
  _id: string;
  name: string;
  email: string;
  role: "player" | "gk";
  usedGames: number;
}


export interface Subscription {
  id: string;
  price: number;
}




