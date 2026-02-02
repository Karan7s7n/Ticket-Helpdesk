import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  return (
    <div className="navbar">
      <h2>Ticketing Capacity Dashboard</h2>

      <div className="admin">
        <div className="admin-btn" onClick={() => setOpen(!open)}>
          <div className="avatar">
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

        {open && (
          <div className="dropdown">
            <a onClick={() => navigate("/profile")}>Profile</a>
            <a onClick={() => navigate("/login")}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}
