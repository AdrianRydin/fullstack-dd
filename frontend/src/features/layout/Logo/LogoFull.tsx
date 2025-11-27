import "./logoFull.css";
import logo from "../../../assets/logo-full-transparent.png";
import bamboo1 from "../../../assets/bambo1.png";
import bamboo2 from "../../../assets/bambo2.png";

function LogoFull() {
  return (
    <section className="logo-wrapper">
      <img
        src={bamboo1}
        alt="Bamboo leaf left"
        className="logo-bamboo logo-bamboo-left"
      />
      <img
        src={logo}
        alt="Umami logo of sushi and chopsticks"
        className="logo-full"
      />
      <img
        src={bamboo2}
        alt="Bamboo leaf right"
        className="logo-bamboo logo-bamboo-right"
      />
    </section>
  );
}

export default LogoFull;
