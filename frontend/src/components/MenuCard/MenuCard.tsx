import "./menucard.css";
import Button from "../Button/Button";

type MenuCardProps = {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
  onEdit?: () => void;
};

export function MenuCard({
  id,
  name,
  description,
  price,
  image,
  onAddToCart,
  onEdit,
}: MenuCardProps) {
  return (
    <article
      className="menu-card"
      aria-labelledby={id ? `menu-${id}` : undefined}
    >
      <div className="menu-card-image">
        {image ? <img src={image} alt={name} /> : null}
      </div>

      <div className="menu-card-body">
        <h3 id={id ? `menu-${id}` : undefined}>{name}</h3>
        <p className="menu-card-price">{price} kr</p>
        <p className="menu-card-desc">{description}</p>

        {/* Actions: visa endast Edit om onEdit finns, annars visa Add to cart (oförändrat) */}
        <div className="menu-card-admin-actions">
          {onEdit ? (
            <div className="menu-card-edit">
              <Button
                text="Edit"
                type="button"
                onClick={onEdit}
                variant="secondary"
                className="menu-card-edit-button"
              />
            </div>
          ) : (
            onAddToCart && (
              <button
                className="secondary-button"
                onClick={onAddToCart}
                aria-label={`Add ${name} to cart`}
              >
                <span className="secondary-button-label">Add to cart</span>
                <span className="secondary-button-icon">
                  <img src="./src/assets/add-to-cart.png" alt="" />
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
