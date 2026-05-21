import React from 'react'
import UserManagementTabs from './_components/user-management-tabs'
import DashboardHeader from '@/components/ui/dashboard-header'

const UserManagementDetails = ({params}:{params:{id:string}}) => {
      console.log(params)
  return (
    <div>
      <DashboardHeader title="User Management" desc="Ready to compete in your next match?"/>
        <UserManagementTabs id={params?.id}/>
    </div>
  )
}

export default UserManagementDetails