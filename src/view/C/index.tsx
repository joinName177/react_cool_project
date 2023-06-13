import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function C() {
  return (
    <div className="h_100" style={{ padding: "0 12px 12px 12px" }}>
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
      <Outlet />
    </div>
  );
}
