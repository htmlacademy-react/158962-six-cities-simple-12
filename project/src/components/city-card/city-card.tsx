import { Offer } from '../../types/Offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import CardMark from '../card-mark/card-mark';
import { getRating, capitalizeFirstLetter } from '../../utils';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type CityCardProps = {
  className: string;
  classNameWrapper: string;
  offer: Offer;
  onActiveCardId?: (id: number | null) => void;
}

const CityCard = ({ className, classNameWrapper, offer, onActiveCardId }: CityCardProps): JSX.Element => {
  const { previewImage, isPremium, price, isFavorite, title, type, rating, id} = offer;

  const handleCityCardOnMouseOver = (cityCardId: number): void => {
    onActiveCardId && onActiveCardId(cityCardId);
  };

  const handleCityCardOnMouseLeave = (): void => {
    onActiveCardId && onActiveCardId(null);
  };

  return (
    <article className={cn('place-card', className)}>
      {
        isPremium &&
        <CardMark />
      }
      <div className={cn('place-card__image-wrapper', classNameWrapper)}>
        <a href="#"
          onMouseOver={() => handleCityCardOnMouseOver(id)}
          onMouseLeave={handleCityCardOnMouseLeave}
        >
          <img className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {
            isFavorite &&
            <BookmarkButton />
          }

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link key={id} to={`/room/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
};

export default CityCard;
