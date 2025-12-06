import "./home.css";
import { Link } from "react-router-dom";
import LogoFull from "../../features/layout/Logo/LogoFull";
import { MENU_ITEMS } from "../__tests__/index.ts";
import Button from "../../components/Button/Button.tsx";
import MenuCard from "../../components/MenuCard/MenuCard.tsx";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard.tsx";

export default function Home() {
  const previewMenu = MENU_ITEMS.slice(0, 4);
  const favorites = MENU_ITEMS.slice(0, 3);
  const popular = MENU_ITEMS.slice(3, 6);

  return (
    <main className="home-page">
      <LogoFull />
      <div className="home-hero">
        <div className="hero-text">
          <p className="hero-tagline">
            simple, fresh, and <span>unforgettable.</span>
          </p>
          <p className="hero-sub">
            A place where every roll is made with love.
          </p>
          <Link
            to="/menu"
            style={{ textDecoration: "none" }}
            className="view-menu-button"
          >
            <Button text="View Menu" />
          </Link>
        </div>

        <section className="home-section">
          <h2 className="section-heading">Favorites</h2>
          <div className="favorites-list">
            <FavoriteCard
              favorites={favorites.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.image,
              }))}
              popular={popular.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.image,
              }))}
            />
          </div>
        </section>

        <section className="about-section">
          <h1 className="about-heading">About us</h1>

          <img
            src="/src/assets/Resturant.png"
            alt="Picture of our restaurant"
            className="about-img"
          />

          <article className="about-card">
            <h2 className="welcome-heading">
              <span className="highlight">Welcome</span> to our sushi restaurant
            </h2>

            <p className="about-text">
              Our inspiration comes from the heart of Japanese culinary culture:
              respect for ingredients, balance in taste, and a dedication to
              detail. Whether you join us for a quick lunch, a cozy dinner, or a
              celebration with friends, we aim to create moments that are
              memorable and comforting.
            </p>
          </article>
        </section>

        <section className="home-content">
          <section className="home-section">
            <h2 className="section-heading">Our Menu</h2>
            <div className="menu-grid-preview">
              {previewMenu.map((item) => (
                <MenuCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  onAddToCart={() => console.log("Added")}
                />
              ))}
            </div>

            <div className="view-all-wrap">
              <Link to="/menu">
                <Button text="View All" />
              </Link>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
