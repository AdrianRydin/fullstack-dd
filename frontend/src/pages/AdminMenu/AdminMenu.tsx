import "./AdminMenu.css";
import { useEffect, useState } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";
import { useMenuFilter } from "../../features/menu/useMenuFilter";
import { getMenu } from "../../api/menu";
import type { MenuItem } from "../../api/menu";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function AdminMenu() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { filteredMenu } = useMenuFilter(menuItems);

  useEffect(() => {
    getMenu()
      .then((items) => {
        setMenuItems(items);
      })
      .catch((err) => {
        console.error("Failed to load menu from API:", err);
      });
  }, []);

  function handleAddItem() {
    navigate("/admin/add");
  }

  return (
    <main className="admin-menu-page">
      <section className="menu-title-wrapper-admin">
        <h1 className="menu-title">Menu</h1>

        <div className="admin-add-button">
          <Button text="Add item" type="button" onClick={handleAddItem} />
        </div>
      </section>

      <div className="menu-list">
        {filteredMenu.map((item) => (
          <MenuCard
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.imageUrl ?? ""}
            onEdit={() => navigate(`/admin/edit/${item._id}`)}
          />
        ))}
      </div>
    </main>
  );
}
