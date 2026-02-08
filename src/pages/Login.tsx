import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./AuthPage.css";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // LOGIN
  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) return setError(error.message);

    navigate("/");
  };

  // SIGNUP
  const handleSignup = async () => {
    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setLoading(false);
      return setError(error.message);
    }

    // If auto-login is available
    if (data.session) {
      setLoading(false);
      navigate("/");
      return;
    }

    // Otherwise, attempt manual login
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) return setError(loginError.message);

    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
        <p className="subtitle">
          {mode === "login"
            ? "Sign in to continue"
            : "Start managing tickets in minutes"}
        </p>

        <div className="form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          )}

          {error && <div className="error">{error}</div>}

          <button
            onClick={mode === "login" ? handleLogin : handleSignup}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </div>

        <span
          className="switch"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "New here? Create account →"
            : "Already have an account? Login →"}
        </span>
      </div>
    </div>
  );
}
