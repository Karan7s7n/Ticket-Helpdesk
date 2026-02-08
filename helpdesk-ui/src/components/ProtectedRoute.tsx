import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import AuthPage from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteComponent = ({ children }: ProtectedRouteProps) => {
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <ProtectedRouteComponent>
              <Dashboard />
            </ProtectedRouteComponent>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRouteComponent>
              <Reports />
            </ProtectedRouteComponent>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRouteComponent>
              <Profile />
            </ProtectedRouteComponent>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
