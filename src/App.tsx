import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import { supabase } from "./supabase";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AuthPage from "./pages/Login";

function Protected({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  if (!session) return <Navigate to="/login" />;

  return children;
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
              <>
                <Navbar />
                <Dashboard />
              </>
            </Protected>
          }
        />

        <Route
          path="/reports"
          element={
            <Protected>
              <>
                <Navbar />
                <Reports />
              </>
            </Protected>
          }
        />

        <Route
          path="/profile"
          element={
            <Protected>
              <>
                <Navbar />
                <Profile />
              </>
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
