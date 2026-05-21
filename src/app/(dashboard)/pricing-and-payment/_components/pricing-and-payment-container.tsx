"use client"
import React, { useState } from 'react'
import PricingIndividualContainer from './pricing-individual-container';
import PricingTeamContainer from './pricing-team-container';

const PricingAndPaymentContainer = () => {
  const [isActive, setIsActive] = useState("pricing-individual-container");
  return (
    <div>
      {/* sub-pages */}
      <div>
        <div className="flex items-center gap-6 px-6 pt-8">
          <button
            className={`h-[48px] text-base text-primary rounded-[6px] leading-[120%] font-semibold border border-[#10e607] py-3 px-7 ${isActive === "pricing-individual-container" &&
              "bg-primary text-white rounded-[6px] py-3 px-7"
              }`}
            onClick={() => setIsActive("pricing-individual-container")}
          >
            Individual Player
          </button>
          <button
            className={`w-[180px] h-[48px] text-base text-primary rounded-[6px] leading-[120%] font-semibold border border-[#10e607] py-3 px-7 ${isActive === "pricing-team-container" &&
              "bg-primary text-white rounded-[6px] py-3 px-7"
              }`}
            onClick={() => setIsActive("pricing-team-container")}
          >
            Team
          </button>


        </div>

        <div className="mt-8">
          {isActive === "pricing-individual-container" && (

            <div>
              <PricingIndividualContainer />
            </div>
          )}

          {isActive === "pricing-team-container" && (

            <div>
              <PricingTeamContainer />
            </div>
          )}


        </div>
      </div>
    </div>
  )
}

export default PricingAndPaymentContainer