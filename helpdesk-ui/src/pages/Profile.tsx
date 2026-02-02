import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setPreview(data.avatar);
      });
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setProfile({ ...profile, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }).then(() => alert("Profile updated"));
  };

  if (!profile) return null;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <h2>My Profile</h2>

        <div className="card" style={{ maxWidth: 450 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            {preview ? (
              <img
                src={preview}
                style={{ width: 120, height: 120, borderRadius: "50%" }}
              />
            ) : (
              <div className="avatar" style={{ margin: "0 auto" }}>
                {profile.name[0]}
              </div>
            )}
            <input type="file" onChange={handleImage} />
          </div>

          <input
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
          />
          <input
            value={profile.role}
            onChange={e => setProfile({ ...profile, role: e.target.value })}
          />
          <input
            value={profile.company}
            onChange={e => setProfile({ ...profile, company: e.target.value })}
          />

          <button onClick={saveProfile}>Save Profile</button>
        </div>
      </div>
    </div>
  );
}
