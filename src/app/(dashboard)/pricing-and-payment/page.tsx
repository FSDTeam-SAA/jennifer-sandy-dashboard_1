import DashboardHeader from '@/components/ui/dashboard-header'
import React from 'react'
import PricingAndPaymentContainer from './_components/pricing-and-payment-container'

const PricingAndPaymentPage = () => {
  return (
    <div>
        <DashboardHeader title="Pricing & Payment " desc="Ready to compete in your next match?"/>
        <PricingAndPaymentContainer/>
    </div>
  )
}

export default PricingAndPaymentPage