import "./footer.css";
import logo from "../../../assets/logo-full-transparent.png";
import bamboo1 from "../../../assets/bambo1.png";
import bamboo2 from "../../../assets/bambo2.png";

type FooterProps = {
  showLogo?: boolean;
  showBamboo?: boolean;
  showText?: boolean;
};

function Footer({
  showLogo = true,
  showBamboo = true,
  showText = true,
}: FooterProps) {
  return (
    <footer className="footer">
      {showBamboo && (
        <>
          <img
            src={bamboo1}
            alt="Bamboo leaf left"
            className="footer-bamboo footer-bamboo-left"
          />
          <img
            src={bamboo2}
            alt="Bamboo leaf right"
            className="footer-bamboo footer-bamboo-right"
          />
        </>
      )}

      {showLogo && (
        <>
          <img
            src={logo}
            alt="Umami logo of sushi and chopsticks"
            className="footer-logo"
          />
        </>
      )}
      {showText && (
        <section className="footer-info">
          <article className="info-section">
            <h2 className="info-heading">Contact us</h2>
            <p className="info-text">Phone: +46 000 000 000</p>
            <p className="info-text">Email: info@umami.com</p>
          </article>
          <article className="info-section">
            <h2 className="info-heading">Address</h2>
            <p className="info-text">Umami Restaurant</p>
            <p className="info-text">Sakura Street 12</p>
            <p className="info-text">123 45 Stockholm</p>
          </article>
          <article className="info-section">
            <h2 className="info-heading">Opening Hours</h2>
            <p className="info-text">Mon–Fri: 11:00 – 22:00</p>
            <p className="info-text">Sat–Sun: 12:00 – 23:00</p>
          </article>
        </section>
      )}
    </footer>
  );
}

export default Footer;
