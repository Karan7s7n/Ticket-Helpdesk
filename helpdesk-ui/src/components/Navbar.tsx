import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

type Profile = {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar: string | null;
};

export default function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase
        .from("profile")
        .select("*")
        .single();

      setProfile(data || null);
    };

    loadProfile();

    // Listen for logout from anywhere
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate("/login");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Reports", path: "/reports" },
    { name: "Profile", path: "/profile" },
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
      <h2 style={{ margin: 0 }}>Ticket HelpDesk</h2>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background:
                location.pathname === item.path ? "#00ff66" : "transparent",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {item.name}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid #333",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Logout
        </button>

        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            fontWeight: 600,
          }}
        >
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            profile?.name?.[0] || "A"
          )}
        </div>
      </div>
    </div>
  );
}
