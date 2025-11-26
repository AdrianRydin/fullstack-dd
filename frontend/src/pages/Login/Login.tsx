import { Link } from "react-router-dom";
import "./login.css";
import Footer from "../../components/footer/Footer";

export default function Login() {
  return (
    <section>
      <h1>Login</h1>
      <Link to={"/register"}>Go to Register</Link>
      <Footer />
    </section>
  );
}
