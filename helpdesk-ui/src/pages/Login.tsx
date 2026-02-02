import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h2>Login</h2>
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <button onClick={() => navigate("/")}>Login</button>
    </div>
  );
}
