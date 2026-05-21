export interface GetRevenueApiResponse {
  statusCode: number
  success: boolean
  message: string
  meta: Meta
  data: RevenueData
}

export interface Meta {
  total: number
  page: number
  limit: number
}

export interface RevenueData {
  totalRevenue: number
  totalPayments: number
  data: Payment[]
}


export interface Payment {
  user: User
  paymentId: string
  amount: number
  currency: "usd" | string
  status: "completed" | "pending" | "failed"
  paymentType: "Individual" | "Team" | string
  stripeSessionId: string
  stripePaymentIntentId: string
  createdAt: string
  updatedAt: string
    team: Team  
  subscription: Subscription
}

export interface Team {
  id?: string;
  teamName?: string;
  coachName?: string;
  coachEmail?: string;
  category?: string;
  league?: string;
  players?: Player[];
  createdAt?: string;
}

export interface Player {
  _id: string;
  name: string;
  email: string;
  role: "player" | "gk";
  usedGames: number;
}




export interface User {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  role: string
  profileImage: string
  currentClub: string
  league: string
  category: string
  position: Position[]
  jerseyNumber: string
  teamName: string
}

export type Position = "lb" | "rb" | "cb" | "gk" | string


export interface Subscription {
  id: string
  price: number
}







