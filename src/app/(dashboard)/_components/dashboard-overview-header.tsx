"use client"
import { useSession } from "next-auth/react";
import React from "react";

const DashboardOverviewHeader = () => {
  const session = useSession();
  // console.log(session)
  const user = (session?.data?.user as {firstName:string})?.firstName
  // console.log(user)
  return (
    <div className="sticky top-0  z-50">
      {/* Header */}
      <div className="bg-white p-6 ">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#181818] leading-[150%]">
          Welcome back, {user} 
        </h1>
        <p className="text-sm font-normal text-[#424242] leading-[150%]">
          Ready to compete in your next match?
        </p>
      </div>
    </div>
  );
};

export default DashboardOverviewHeader;
