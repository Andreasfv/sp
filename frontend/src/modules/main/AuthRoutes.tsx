import { Dashboard } from 'modules/dashboard/Dashboard'
import { Straffepils } from 'modules/straffepils/Straffepils'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

interface AuthRoutesProps {}

export const AuthRoutes: React.FC<AuthRoutesProps> = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="/meld-straffepils" element={<Straffepils />} />
    </Routes>
  )
}
