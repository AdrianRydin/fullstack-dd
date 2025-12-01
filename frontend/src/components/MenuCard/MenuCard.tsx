import "./menucard.css";

type MenuCardProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
};

export function MenuCard({
  name,
  description,
  price,
  image,
  onAddToCart,
}: MenuCardProps) {
  return (
    <article className="menu-card">
      <div className="menu-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="menu-card-body">
        <h3>{name}</h3>
        <p className="menu-card-price">{price} kr</p>
        <p className="menu-card-desc">{description}</p>

        {onAddToCart && (
          <button className="secondary-button" onClick={onAddToCart}>
            <span className="secondary-button-label">Add to cart</span>
            <span className="secondary-button-icon">
              <img src="./src/assets/add-to-cart.png" alt="" />
            </span>
          </button>
        )}
      </div>
    </article>
  );
}
export default MenuCard;
