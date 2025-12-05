import "./menu.css"
import MenuCard from "../../components/MenuCard/MenuCard"
import { MENU_ITEMS } from "../__tests__/index.ts"
import LogoFull from "../../features/layout/Logo/LogoFull"
import MenuFilter from "../../features/menu/MenuFilter.tsx"
import { useMenuFilter } from "../../features/menu/useMenuFilter.ts"

export default function Menu() {
  const { filter, setFilter, filteredMenu } = useMenuFilter(MENU_ITEMS)

  return (
    <main className="menu-page">
      <LogoFull />

      <section className="menu-title-wrapper">
        <span className="menu-title-dash" aria-hidden="true"></span>
        <h1 className="menu-title">Our Menu</h1>
      </section>

      <MenuFilter filter={filter} setFilter={setFilter} />

      <div className="menu-list">
        {filteredMenu.map((item) => (
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
  )
}
