import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const PrivateRoute = () => {
  return (

        <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/auth/login/" />} />
        </Routes>
  )
}

export default PrivateRoute