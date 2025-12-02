import { useState } from "react";
// import Header from "../../components/header/Header";
import "../../styles/RegisterLogin.css";
import topLeftImg from "../../assets/bambo1.png";
import bottomRightImg from "../../assets/bambo2.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Placeholder-funktion
    console.log({ email, password, confirmPassword });
    setError("");
    alert("Registration successful! (placeholder)");
  };

  return (
    <>
      {/* <Header /> */}
      <section className="auth-container">
        <img src={topLeftImg} alt="Top Left" className="top-left-img" />
        <h1>Register</h1>
        <section className="form-group__container">
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

          <div className="form-group">
            <label>*Repeat Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <section className="btn-container">
            <button className="auth-btn" onClick={handleRegister}>
              Register
            </button>
          </section>

          <p className="register-text">
            Already a member?
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>

          <span className="bottom-line"></span>
        </section>
      </section>
      <section className="bottom-img-container">
        <img
          src={bottomRightImg}
          alt="Bottom Right"
          className="bottom-right-img"
        />
      </section>
    </>
  );
}
