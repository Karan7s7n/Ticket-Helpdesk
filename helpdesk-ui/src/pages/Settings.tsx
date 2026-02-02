import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <h2>My Profile</h2>

        {profile && (
          <div className="card">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Department:</strong> {profile.department}</p>
          </div>
        )}
      </div>
    </div>
  );
}
