import { Link } from "react-router-dom";
import "./register.css";
import Footer from "../../features/layout/Footer/Footer";

export default function Register() {
  return (
    <section>
      <h1>Register</h1>
      <Link to={"/login"}>Go to Login</Link>
      <Footer />
    </section>
  );
}
