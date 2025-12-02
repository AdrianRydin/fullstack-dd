import "./favorite.css";

type FavoriteCardProps = {
  name: string;
  price: number;
  image: string;
};

export function FavoriteCard({ name, price, image }: FavoriteCardProps) {
  return (
    <article className="favorite-card">
      <div className="favorite-image">
        <img src={image} alt={name} />
      </div>
      <div className="favorite-info">
        <h3>{name}</h3>
        <p className="favorite-price">{price} kr</p>
      </div>
    </article>
  );
}

export default FavoriteCard;