import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { supabase } from "./supabase";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AuthPage from "./pages/Login";

interface ProtectedProps {
  children: ReactNode;
}

function Protected({ children }: ProtectedProps) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Load initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => setSession(session)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!session) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        <Route
          path="/reports"
          element={
            <Protected>
              <Reports />
            </Protected>
          }
        />

        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
