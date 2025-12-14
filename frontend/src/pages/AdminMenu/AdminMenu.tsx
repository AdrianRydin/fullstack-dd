import "./AdminMenu.css";
import { useEffect, useState } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";
import { useMenuFilter } from "../../features/menu/useMenuFilter";
import {getMenu,createMenuItem,updateMenuItem,type MenuItem,type NewMenuItem,type Ingredient,} from "../../api/menu";
import Button from "../../components/Button/Button";
import LogoFull from "../../features/layout/Logo/LogoFull";


type ModalMode = "create" | "edit";
type EditableMenuItem = Omit<MenuItem, "_id"> & { _id?: string };

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { filteredMenu } = useMenuFilter(menuItems);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    getMenu()
      .then((items) => {
        setMenuItems(items);
      })
      .catch((err) => {
        console.error("Failed to load menu from API:", err);
      });
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setModalMode("edit");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = async (values: EditableMenuItem) => {
    try {
      let saved: MenuItem;

      if (modalMode === "create") {
        const payload: NewMenuItem = {
          name: values.name,
          description: values.description,
          price: values.price,
          category: values.category,
          imageUrl: values.imageUrl,
          isAvaliable: values.isAvaliable,
          tags: values.tags,
          ingredients: values.ingredients,
        };

        saved = await createMenuItem(payload);
        setMenuItems((prev) => [saved, ...prev]);
      } else if (modalMode === "edit" && editingItem?._id) {
        const payload: Partial<NewMenuItem> = {
          name: values.name,
          description: values.description,
          price: values.price,
          category: values.category,
          imageUrl: values.imageUrl,
          isAvaliable: values.isAvaliable,
          tags: values.tags,
          ingredients: values.ingredients,
        };

        saved = await updateMenuItem(editingItem._id, payload);
        setMenuItems((prev) =>
          prev.map((i) => (i._id === saved._id ? saved : i))
        );
      } else {
        return;
      }

      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save menu item:", err);
      alert("Something went wrong when saving the item.");
    }
  };

  return (
    <main className="admin-menu-page">
      <LogoFull />
      <section className="admin-menu-hero">

        <h1 className="admin-menu-title">Admin menu</h1>

        <span
          className="admin-menu-dash"
          aria-hidden="true"
        ></span>

        <div className="admin-add-button">
          <Button text="Add item" type="button" onClick={openCreateModal} />
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
            onEdit={() => openEditModal(item)}
          />
        ))}
      </div>

      {modalOpen && (
        <AdminMenuItemModal
          mode={modalMode}
          initialItem={editingItem}
          onCancel={closeModal}
          onSave={handleSave}
        />
      )}
    </main>
  );
}

interface AdminMenuItemModalProps {
  mode: ModalMode;
  initialItem: MenuItem | null;
  onCancel: () => void;
  onSave: (values: EditableMenuItem) => void;
}

function AdminMenuItemModal({
  mode,
  initialItem,
  onCancel,
  onSave,
}: AdminMenuItemModalProps) {
  const [name, setName] = useState(initialItem?.name ?? "");
  const [description, setDescription] = useState(
    initialItem?.description ?? ""
  );
  const [price, setPrice] = useState(
    initialItem ? String(initialItem.price) : ""
  );
  const [category, setCategory] = useState(initialItem?.category ?? "sushi");
  const [imageUrl, setImageUrl] = useState(initialItem?.imageUrl ?? "");
  const [isAvailable, setIsAvailable] = useState(
    initialItem?.isAvaliable ?? true
  );
  const [tagsText, setTagsText] = useState(
    (initialItem?.tags ?? []).join(", ")
  );

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialItem?.ingredients ?? []
  );

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) =>
        i === index
          ? {
              ...ing,
              [field]:
                field === "amount" ? Number(value) || 0 : value,
            }
          : ing
      )
    );
  };

  const addIngredientRow = () => {
    setIngredients((prev) => [
      ...prev,
      { name: "", amount: 0, unit: "" },
    ]);
  };

  const removeIngredientRow = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPrice = Number(price);
    if (!name || !category || !parsedPrice) {
      alert("Name, price and category are required");
      return;
    }

    const tags =
      tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) || [];

    // rensa bort tomma ingredients
    const cleanedIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.amount > 0 && ing.unit.trim()
    );

    const values: EditableMenuItem = {
      name,
      description,
      price: parsedPrice,
      category,
      imageUrl: imageUrl || undefined,
      isAvaliable: isAvailable,
      tags,
      ingredients: cleanedIngredients,
      _id: initialItem?._id,
    };

    onSave(values);
  };

  const shortId = initialItem?._id
    ? initialItem._id.slice(-6).toUpperCase()
    : null;

  return (
    <div className="admin-menu-modal-backdrop">
      <div className="admin-menu-modal">
        <header className="admin-menu-modal-header">
          <div>
            <h2 className="admin-menu-modal-title">
              {mode === "create" ? "Add menu item" : "Edit menu item"}
            </h2>
            {shortId && (
              <p className="admin-menu-modal-subtitle">
                ID: #{shortId}
              </p>
            )}
          </div>
          <button
            type="button"
            className="admin-menu-modal-close"
            onClick={onCancel}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <form className="admin-menu-modal-form" onSubmit={handleSubmit}>
          <label className="admin-menu-modal-field">
            <span>Name *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="admin-menu-modal-field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>

          <label className="admin-menu-modal-field">
            <span>Price (kr) *</span>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label className="admin-menu-modal-field">
            <span>Category *</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="sushi">Sushi</option>
              <option value="drinks">Drinks</option>
              {!["sushi", "drinks"].includes(category) && (
                <option value={category}>{category}</option>
              )}
            </select>
          </label>

          <label className="admin-menu-modal-field">
            <span>Image URL</span>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/Sushi-plate2.png"
            />
          </label>

          <label className="admin-menu-modal-field admin-menu-modal-checkbox">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
            <span>Available</span>
          </label>

          <label className="admin-menu-modal-field">
            <span>Tags (comma separated)</span>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="favorite, Nigiri, All"
            />
          </label>

          
          <div className="admin-menu-modal-field">
            <span>Ingredients</span>
            <div className="admin-ingredients-list">
              {ingredients.map((ing, index) => (
                <div
                  key={index}
                  className="admin-ingredient-row"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    value={ing.name}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="Amount"
                    value={ing.amount}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "amount",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Unit (g, pcs...)"
                    value={ing.unit}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "unit",
                        e.target.value
                      )
                    }
                  />
                  <button
                    type="button"
                    className="admin-ingredient-remove"
                    onClick={() => removeIngredientRow(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="admin-ingredient-add"
              onClick={addIngredientRow}
            >
              + Add ingredient
            </button>
          </div>

          <div className="admin-menu-modal-actions">
            <button
              type="button"
              className="admin-menu-modal-button admin-menu-modal-button--secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-menu-modal-button admin-menu-modal-button--primary"
            >
              {mode === "create" ? "Add item" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}