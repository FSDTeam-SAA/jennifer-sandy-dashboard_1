export interface MonthlyRevenueChartApiResponse {
  statusCode: number
  success: boolean
  message: string
  data: MonthlyRevenueItem[]
}

export interface MonthlyRevenueItem {
  month: string
  revenue: number
}

