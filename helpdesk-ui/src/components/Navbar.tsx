import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Reports", path: "/reports" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/login" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#111",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        zIndex: 1000,
      }}
    >
      {/* Brand / Title */}
      <h2 style={{ margin: 0 }}>Ticket HelpDesk</h2>

      {/* Right side navigation buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              backgroundColor:
                location.pathname === item.path ? "#0f0" : "transparent",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
              transition: "background 0.2s",
            }}
          >
            {item.name}
          </Link>
        ))}

        {/* Optional small avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              style={{ width: 34, height: 34, borderRadius: "50%" }}
            />
          ) : (
            profile?.name?.[0] || "A"
          )}
        </div>
      </div>
    </div>
  );
}
