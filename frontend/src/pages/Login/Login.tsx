import { useState } from "react";
import "../../styles/RegisterLogin.css";
import topLeftImg from "../../assets/bambo1.png";
import bottomRightImg from "../../assets/bambo2.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Placeholder-funktion
    console.log({ email, password });
    setError("");
    alert("Login successful! (placeholder)");
  };

  return (
    <>
      {/* <Header /> */}
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
        </section>
        <img
          src={bottomRightImg}
          alt="Bottom Right"
          className="bamboo-images bottom-right-img"
        />
      </section>
    </>
  );
}
