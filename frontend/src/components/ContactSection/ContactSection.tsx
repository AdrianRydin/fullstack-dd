import "./contactSection.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import map from "../../assets/map.png";
import bamboo from "../../assets/bambo1.png";

function ContactSection() {
  return (
    <section className="contact-section">
      <h1 className="contact-heading">Contact us</h1>
      <section className="contact-layout">
        <article className="contact-left">
          <img
            src={map}
            alt="Map to find our restaurant"
            className="contact-map"
          />
          <img
            src={bamboo}
            alt="Map to find our restaurant"
            className="contact-bamboo"
          />
        </article>
        <article className="contact-right">
          <article className="contact-container">
            <h3 className="contact-subheading">Address</h3>
            <p>Umami Restaurant</p>
            <p>Sakura Street 12</p>
            <p>123 45 Stockholm, Sweden</p>
          </article>
          <article className="contact-container">
            <h3 className="contact-subheading">Opening Hours</h3>
            <p>Mon–Fri: 11:00 – 22:00</p>
            <p>Sat–Sun: 12:00 – 23:00</p>
          </article>
          <article className="contact-container">
            <LocalPhoneIcon className="phone-icon" aria-hidden="true" />
            <p>Phone: +46 000 000 000</p>
            <p>Email: info@umami.com</p>
          </article>
        </article>
      </section>
    </section>
  );
}

export default ContactSection;
