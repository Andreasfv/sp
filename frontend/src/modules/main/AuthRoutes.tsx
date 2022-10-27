import { Dashboard } from 'modules/dashboard/Dashboard'
import { Straffepils } from 'modules/straffepils/Straffepils'
import { StraffepilsDashboard } from 'modules/straffepils/views/dashboard/StraffepilsDashboard'
import { MeldStraffepils } from 'modules/straffepils/views/meldstraffepils/MeldStraffepils'
import { SeStraffepils } from 'modules/straffepils/views/sestraffepils/SeStraffepils'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

interface AuthRoutesProps {}

export const AuthRoutes: React.FC<AuthRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/straffepils">
        <Route path="" element={<StraffepilsDashboard />} />
        <Route path="meld-straffepils" element={<MeldStraffepils />} />
        <Route path="se-straffepils" element={<SeStraffepils />} />
      </Route>
    </Routes>
  )
}
