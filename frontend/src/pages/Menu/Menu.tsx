import "./menu.css"
import { useEffect, useState } from "react"
import MenuCard from "../../components/MenuCard/MenuCard"
import LogoFull from "../../features/layout/Logo/LogoFull"
import MenuFilter from "../../features/menu/MenuFilter"
import { useMenuFilter } from "../../features/menu/useMenuFilter"
import { useCart } from "../../features/cart/useCart"
import { getMenu } from "../../api/menu"
import type { MenuItem } from "../../api/menu"

export default function Menu() {
  const { addToCart } = useCart()

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  const { filter, setFilter, filteredMenu } = useMenuFilter(menuItems)

  useEffect(() => {
    getMenu()
      .then((items) => {
        setMenuItems(items)
      })
      .catch((err) => {
        console.error("Failed to load menu from API:", err)
      })
  }, [])

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
            key={item._id}
            id={item._id} // id?: string → OK
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.imageUrl ?? ""} // alltid string
            onAddToCart={() =>
              addToCart({
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.imageUrl ?? "",
                quantity: 1,
                description: item.description,
              })
            }
          />
        ))}
      </div>
    </main>
  )
}
