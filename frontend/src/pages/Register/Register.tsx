import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  return (
    <section>
      <h1>Register</h1>
      <Link to={"/login"}>Go to Login</Link>
    </section>
  );
}
