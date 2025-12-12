import "./home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoFull from "../../features/layout/Logo/LogoFull";
import logo from "../../assets/logo-full-transparent.png";
import bamboo1 from "../../assets/bambo1.png";
import bamboo2 from "../../assets/bambo2.png";
import Button from "../../components/Button/Button";
import MenuCard from "../../components/MenuCard/MenuCard";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";
import { getMenu } from "../../api/menu";
import type { MenuItem } from "../../api/menu";

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

   useEffect(() => {
    getMenu()
      .then((items) => {
        const sorted = [...items].sort((a, b) => {
          const catA = (a.category || "").toLowerCase();
          const catB = (b.category || "").toLowerCase();

          const isDrinkA = catA === "drinks";
          const isDrinkB = catB === "drinks";

          if (isDrinkA && !isDrinkB) return 1;
          if (!isDrinkA && isDrinkB) return -1;
          return 0;
        });

        setMenuItems(sorted);
      })
      .catch((err) => {
        console.error("Failed to load menu on Home:", err);
      });
  }, []);

  const foodItems = menuItems.filter(
    (item) => (item.category || "").toLowerCase() !== "drinks"
  );


  const previewMenu = foodItems.slice(0, 3);
  // Om vi vill använda tags:
  // const favoritesItems = menuItems.filter((i) => i.tags?.includes("favorite"));
  // const popularItems = menuItems.filter((i) => i.tags?.includes("popular"));
  const favoritesItems = foodItems.slice(0, 3);
  const popularItems = foodItems.slice(3, 6);

  return (
    <main className="home-page">
      {/* Mobilversion */}
      <div className="home-hero">
        <LogoFull />
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
      </div>

      {/* Desktopversion */}
      <div className="desktop-hero">
        <img src={bamboo1} alt="Bamboo left" className="desktop-bamboo-left" />
        <div className="desktop-content">
          <div className="desktop-text">
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
          <img src={logo} alt="Logo" className="desktop-logo" />
        </div>
        <img
          src={bamboo2}
          alt="Bamboo right"
          className="desktop-bamboo-right"
        />
      </div>

      {/* Favorites / Popular */}
      <section className="home-section">
        <h2 className="section-heading">Favorites</h2>
        <div className="favorites-list">
          <FavoriteCard
            favorites={favoritesItems.map((item) => ({
              id: item._id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl ?? "",
            }))}
            popular={popularItems.map((item) => ({
              id: item._id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl ?? "",
            }))}
          />
        </div>
      </section>

      {/* About us */}
      <section className="about-sect">
        <h2 className="about-section-heading">About us</h2>
        <div className="about-row">
          <img
            src="/src/assets/Resturant.png"
            alt="Picture of our restaurant"
            className="about-image"
          />

          <article className="about-card">
            <h2 className="about-card-heading">
              <span className="highlight">Welcome</span> to our sushi restaurant
            </h2>

            <p className="about-card-text">
              Our inspiration comes from the heart of Japanese culinary
              culture: respect for ingredients, balance in taste, and a
              dedication to detail. Whether you join us for a quick lunch, a
              cozy dinner, or a celebration with friends, we aim to create
              moments that are memorable and comforting.
            </p>
          </article>
        </div>
      </section>

      {/* Menu preview */}
      <section className="home-content">
        <section className="home-section">
          <h2 className="section-heading">Our Menu</h2>
          <div className="menu-grid-preview">
            {previewMenu.map((item) => (
              <MenuCard
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.imageUrl ?? ""}
                onAddToCart={() => console.log("Added")}
              />
            ))}
          </div>

          <div className="view-all-wrap">
            <Link to="/menu" style={{ textDecoration: "none" }}>
              <Button text="View All" />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}