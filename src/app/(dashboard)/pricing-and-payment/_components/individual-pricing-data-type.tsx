// Common API Meta
export interface ApiMeta {
  total: number
  page: number
  limit: number
}

// User info inside payment
export interface PaymentUser {
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
  position: string[]
  jerseyNumber: string
  teamName: string
}

// Subscription info
export interface Subscription {
  id: string
  price: number
}

// Single payment item
export interface PaymentItem {
  user: PaymentUser
  paymentId: string
  amount: number
  currency: string
  status: "completed" | "pending" | "failed"
  paymentType: "Individual" | "Team"
  stripeSessionId: string
  stripePaymentIntentId: string
  createdAt: string
  updatedAt: string
  team: Record<string, unknown>
  subscription: Subscription
}

// Revenue data wrapper
export interface IndividualRevenueData {
  totalRevenue: number
  totalPayments: number
  data: PaymentItem[]
}

// Full API response
export interface GetIndividualApiResponse {
  statusCode: number
  success: boolean
  message: string
  meta: ApiMeta
  data: IndividualRevenueData
}
