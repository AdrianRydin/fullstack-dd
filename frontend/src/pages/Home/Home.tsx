import "./home.css";
import Footer from "../../features/layout/Footer/Footer";
import LogoFull from "../../features/layout/Logo/LogoFull";

function Home() {
  return (
    <>
      <LogoFull />
      <section className="test-section">
        <h1>HomePage</h1>
      </section>
      <Footer />
    </>
  );
}

export default Home;
