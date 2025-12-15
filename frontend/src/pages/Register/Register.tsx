import { useState } from "react";
import "../../styles/RegisterLogin.css";
import topLeftImg from "../../assets/bambo1.png";
import bottomRightImg from "../../assets/bambo2.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (error) {
      setError("Could not register user");
    }
  };

  return (
    <>
      <section className="page-container">
        <img
          src={topLeftImg}
          alt="Top Left"
          className="bamboo-images top-left-img"
        />
        <section className="auth-container">
          <h1>Register</h1>
          <section className="form-group__container">
            <div className="form-group">
              <label>*Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

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
          </section>
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
