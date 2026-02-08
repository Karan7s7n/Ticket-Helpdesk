import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [preview, setPreview] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  // Default profile if API returns empty
  const defaultProfile = {
    name: "Karan Singh Negi",
    email: "a@example.com",
    role: "Frontend Developer Intern",
    company: "me.core",
    avatar: "",
  };

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then(res => res.json())
      .then(data => {
        const p = data || defaultProfile;
        setProfile(p);
        setPreview(p.avatar || "");
      })
      .catch(() => {
        setProfile(defaultProfile);
        setPreview("");
      });
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
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
    }).then(() => {
      alert("Profile updated successfully!");
      setEditOpen(false);
    });
  };

  if (!profile) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="dashboard">
      <div className="main" style={{ padding: "80px 36px 36px 36px" }}>
        {/* Navbar */}
        <Navbar />

        {/* Profile Card */}
        <div
          className="card"
          style={{
            maxWidth: 500,
            margin: "40px auto",
            padding: 30,
            borderRadius: 20,
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          {/* Avatar */}
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                marginBottom: 20,
                objectFit: "cover",
                border: "3px solid #2563eb",
              }}
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "#2563eb",
                color: "#fff",
                fontSize: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              {profile.name?.[0] || "A"}
            </div>
          )}

          {/* Profile Info */}
          <h2 style={{ marginBottom: 8 ,color: "#555"}}>{profile.name}</h2>
          <p style={{ marginBottom: 4, color: "#555" }}>
            <strong>Email:</strong> {profile.email}
          </p>
          <p style={{ marginBottom: 4, color: "#555" }}>
            <strong>Role:</strong> {profile.role}
          </p>
          <p style={{ marginBottom: 20, color: "#555" }}>
            <strong>Company:</strong> {profile.company}
          </p>

          {/* Edit Button */}
          <button
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* ================= EDIT POPUP ================= */}
        {editOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 30,
                borderRadius: 20,
                maxWidth: 500,
                width: "90%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                position: "relative",
              }}
            >
              <h2>Edit Profile</h2>
              <p style={{ color: "#555", marginBottom: 20 }}>
                Update your profile information and avatar.
              </p>

              {/* Avatar Input */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                {preview && (
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: 10,
                    }}
                  />
                )}
                <input type="file" onChange={handleImage} />
              </div>

              {/* Editable Fields */}
              <input
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                }}
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                }}
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                }}
                value={profile.role}
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
                placeholder="Role"
              />
              <input
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 20,
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                }}
                value={profile.company}
                onChange={(e) =>
                  setProfile({ ...profile, company: e.target.value })
                }
                placeholder="Company"
              />

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: "#6b7280",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: "#2563eb",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={saveProfile}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
