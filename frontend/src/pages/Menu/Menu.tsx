import "./menu.css";
import MenuCard from "../../components/MenuCard/MenuCard";
import { MENU_ITEMS } from "../__tests__/index.ts";
import LogoFull from "../../features/layout/Logo/LogoFull";

export default function Menu() {
  return (
    <main className="menu-page">
      <LogoFull />

      <section className="menu-title-wrapper">
        <span className="menu-title-dash" aria-hidden="true"></span>
        <h1 className="menu-title">Our Menu</h1>
      </section>

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
    </main>
  );
}
