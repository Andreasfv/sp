import { Login, Logout } from 'modules/auth'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Authenticate } from './Authenticate'
import { Bootstrap } from './Bootstrap'

export const Root: React.FC = () => {
  return (
    <Bootstrap>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Authenticate />} />

          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </Bootstrap>
  )
}
