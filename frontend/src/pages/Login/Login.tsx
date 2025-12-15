import { useState } from "react";
import "../../styles/RegisterLogin.css";
import topLeftImg from "../../assets/bambo1.png";
import bottomRightImg from "../../assets/bambo2.png";
import { loginUser } from "../../api/auth";
import { useAuthStore } from "../../features/authentication/store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await loginUser({ email, password });
      login(res.user, res.token);
      if (res.user.role === "ADMIN" || res.user.role === "STAFF") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <section className="page-container">
      <img
        src={topLeftImg}
        alt="Top Left"
        className="bamboo-images top-left-img"
      />
      <section className="auth-container">
        <h1>Login</h1>
        <div className="form-group">
          <label>*Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>*Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>
        <p className="register-text">
          Want to register?
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
        <span className="bottom-line"></span>
      </section>
      <img
        src={bottomRightImg}
        alt="Bottom Right"
        className="bamboo-images bottom-right-img"
      />
    </section>
  );
}
