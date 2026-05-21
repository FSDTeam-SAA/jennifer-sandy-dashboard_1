import DashboardHeader from '@/components/ui/dashboard-header'
import React from 'react'
import RevenueContainer from './_components/revenue-container'

const RevenuePage = () => {
  return (
    <div>
        <DashboardHeader title="Revenue" desc="Ready to compete in your next match?"/>
        <RevenueContainer/>
    </div>
  )
}

export default RevenuePage