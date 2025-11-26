import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <section>
      <h1>Login</h1>
      <Link to={"/register"}>Go to Register</Link>
    </section>
  );
}
