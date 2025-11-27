import Footer from "../../components/footer/Footer";
import "./menu.css";
import MenuCard from "../../components/MenuCard/MenuCard";
import { MENU_ITEMS } from "../__tests__/index.ts";

export default function Menu() {
  return (
      <section className="menu-page">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-list">
        {MENU_ITEMS.map((item) => (
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
      <Footer/>
    </section>
  );
}
