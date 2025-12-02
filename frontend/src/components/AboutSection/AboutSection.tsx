import "./aboutSection.css";
import restaurant from "../../assets/Resturant.png";

function AboutSection() {
  return (
    <section className="about-section">
      <h1 className="about-heading">About us</h1>
      <img
        src={restaurant}
        alt="Picture of our restaurant"
        className="about-img"
      />
      <h2 className="welcome-heading">
        <span className="highlight">Welcome</span> to our sushi restaurant
      </h2>
      <article className="about-text-container">
        <p className="about-text">
          Umami was created with a simple mission: to offer clean, honest, and
          beautifully crafted sushi made for take-away. Our small team shares a
          passion for Japanese flavors and mindful cooking, bringing together
          quality, freshness, and simplicity in every order.
        </p>
        <p className="about-text">
          Inspired by Japanese culinary traditions, we focus on respect for
          ingredients, balance in taste, and attention to detail. Whether you’re
          picking up a quick lunch or taking home dinner, we want every meal to
          feel effortless, comforting, and memorable.
        </p>
      </article>
    </section>
  );
}

export default AboutSection;
