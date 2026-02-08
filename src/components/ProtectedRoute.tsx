import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase, Session } from "../supabase";
import { Profile as ProfileType } from "../components/types"; // Shared Profile type

type NavItem = { name: string; path: string };

export default function Navbar() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Load profile & listen for auth changes
  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .single<ProfileType>();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      setProfile(data || null);
    };

    loadProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        if (!session) navigate("/login");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Logout handler
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }
    navigate("/login");
  };

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/" },
    { name: "Reports", path: "/reports" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav
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
      {/* Logo / Title */}
      <h2 style={{ margin: 0 }}>Ticket HelpDesk</h2>

      {/* Navigation & Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Nav links */}
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

        {/* Logout button */}
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

        {/* Avatar */}
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
            profile?.name?.[0].toUpperCase() || "A"
          )}
        </div>
      </div>
    </nav>
  );
}
