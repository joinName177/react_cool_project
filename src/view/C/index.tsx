import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function C() {
  return (
    <div>
        <NavLink
          to="/root/C/F"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          面板F
        </NavLink>
        <NavLink
          to="/root/C/G"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          面板G
        </NavLink>
        <Outlet/>
    </div>
  )
}
