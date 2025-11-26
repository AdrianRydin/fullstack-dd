import "./footer.css";
import logo from "../../../public/Umami-Logo.png";
import bamboo1 from "../../assets/bamboo1.png";
import bamboo2 from "../../assets/bamboo2.png";

type FooterProps = {
  showLogo?: boolean;
  showTextBamboo?: boolean;
};

function Footer({ showLogo = true, showTextBamboo = true }: FooterProps) {
  return (
    <footer className="footer">
        {showLogo && (
          <>
            <img
              src={logo}
              alt="Umami logo of sushi and chopsticks"
              className="footer-logo"
            />
            <h1 className="footer-title">UMAMI</h1>
          </>
        )}
        {showTextBamboo && (
          <section className="footer-info">
            <img src={bamboo1} alt="Bamboo leaf left" className="bamboo bamboo-left" />
            <article className="info-section">
              <h2 className="info-heading">Contact us</h2>
              <p className="info-text">Phone: +46 000 000 000</p>
              <p className="info-text">Email: info@umami.com</p>
            </article>
            <article className="info-section">
              <h2 className="info-heading">Address</h2>
              <p className="info-text">Umami Restaurant</p>
              <p className="info-text">Sakura Street 12</p>
              <p className="info-text">123 45 Stockholm, Sweden</p>
            </article>
            <article className="info-section">
              <h2 className="info-heading">Opening Hours</h2>
              <p className="info-text">Mon–Fri: 11:00 – 22:00</p>
              <p className="info-text">Sat–Sun: 12:00 – 23:00</p>
            </article>
            <img src={bamboo2} alt="Bamboo leaf right" className="bamboo bamboo-right" />
          </section>
        )}
    </footer>
  );
}

export default Footer;
