import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase";
import "./Profile.css";

type ProfileType = {
  id?: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [preview, setPreview] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===== LOAD AUTH USER + PROFILE ===== */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    const baseProfile: ProfileType = {
      id: user.id,
      name: data?.name || "",
      email: user.email || "",
      role: data?.role || "",
      company: data?.company || "",
      avatar: data?.avatar || "",
    };

    setProfile(baseProfile);
    setPreview(baseProfile.avatar || "");
    setLoading(false);
  };

  /* ===== AVATAR PREVIEW ===== */
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setProfile({ ...profile, avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  /* ===== SAVE TO SUPABASE ===== */
  const saveProfile = async () => {
    if (!profile) return;

    await supabase.from("profile").upsert(profile);
    setEditOpen(false);
  };

  if (loading || !profile) return <p className="loading">Loading...</p>;

  const isIncomplete =
    !profile.name || !profile.role || !profile.company;

  return (
    <div className="dashboard">
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          {preview ? (
            <img src={preview} className="avatar" />
          ) : (
            <div className="avatar-placeholder">
              {profile.email[0].toUpperCase()}
            </div>
          )}

          <h2>{profile.name || "Your Name"}</h2>

          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role || "—"}</p>
          <p><strong>Company:</strong> {profile.company || "—"}</p>

          {isIncomplete && (
            <p style={{ color: "#22c55e", marginTop: 10 }}>
              Please complete your profile details
            </p>
          )}

          <button className="edit-btn" onClick={() => setEditOpen(true)}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* ========= EDIT MODAL ========= */}

      {editOpen && (
        <div className="modal-overlay" onClick={() => setEditOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>

            {preview && <img src={preview} className="modal-avatar" />}

            <input type="file" onChange={handleImage} />

            <input
              placeholder="Full Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />

            {/* Email from login (editable if you want — but synced to auth) */}
            <input value={profile.email} disabled />

            <input
              placeholder="Role"
              value={profile.role}
              onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })
              }
            />

            <input
              placeholder="Company"
              value={profile.company}
              onChange={(e) =>
                setProfile({ ...profile, company: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="cancel" onClick={() => setEditOpen(false)}>
                Cancel
              </button>
              <button className="save" onClick={saveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
