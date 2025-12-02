import type { FC } from "react";
import "./FavoriteCard.css";
import cartIcon from "../assets/add-to-cart 1.svg";

export interface Dish {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface FavoriteCardProps {
  favorites: Dish[];
  popular: Dish[];
}

const FavoriteCard: FC<FavoriteCardProps> = ({ favorites, popular }) => {
  const hasFavorites = favorites.length > 0;
  const listToShow = hasFavorites ? favorites : popular;

  return (
    <section className="favorites">
      <div className="favorites__header">
        <span className="favorites__header-line" />
        <h2 className="favorites__title">Favorites</h2>
      </div>

      <ul className="favorites__list">
        {listToShow.map((dish) => (
          <li key={dish.id} className="favorite-card">
            {dish.imageUrl && (
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="favorite-card__image"
              />
            )}

            <div className="favorite-card__content">
              <h3 className="favorite-card__name">{dish.name}</h3>
              <p className="favorite-card__price">{dish.price} kr</p>
            </div>

            <button
              type="button"
              className="favorite-card__button"
              aria-label="Add to cart"
            >
              <img src={cartIcon} alt="" className="favorite-card__icon" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FavoriteCard;
