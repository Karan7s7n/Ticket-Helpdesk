import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      style={{
        width: 200,
        height: "100vh",
        background: "#222",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : -200,
        transition: "left 0.3s",
        paddingTop: 60,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        Helpdesk
      </div>

      {["Dashboard", "Reports", "Profile"].map((name) => {
        const path = name === "Dashboard" ? "/" : `/${name.toLowerCase()}`;
        return (
          <NavLink
            key={name}
            to={path}
            onClick={toggleSidebar}
            style={({ isActive }) => ({
              display: "block",
              padding: "10px 20px",
              color: "#fff",
              textDecoration: "none",
              background: isActive ? "#444" : "transparent",
              transition: "background 0.2s",
            })}
          >
            {name}
          </NavLink>
        );
      })}
    </div>
  );
}
