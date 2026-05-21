import DashboardHeader from '@/components/ui/dashboard-header'
import React from 'react'
import UserManagementContainer from './_components/user-management-container'

const UserManagementPage = () => {
  return (
    <div>
        <DashboardHeader title="User Management" desc="Ready to compete in your next match?"/>
        <UserManagementContainer/>
    </div>
  )
}

export default UserManagementPage