import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">Helpdesk</div>

      <NavLink to="/" className="nav">
        Dashboard
      </NavLink>

      <NavLink to="/reports" className="nav">
        Reports
      </NavLink>

      <NavLink to="/profile" className="nav">
        Profile
      </NavLink>
    </div>
  );
}
