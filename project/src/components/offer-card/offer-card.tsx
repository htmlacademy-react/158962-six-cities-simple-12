import { Offer } from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import CardMark from '../card-mark/card-mark';
import { capitalizeFirstLetter, getRatingWidth } from '../../utils/utils';
import cn from 'classnames';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, MAX_RATING } from '../../const';

type OfferCardProps = {
  className: string;
  classNameWrapper: string;
  offer: Offer;
  sizeType: 'default' | 'favorite';
  onActiveCardId?: (id: number | null) => void;
}

const sizes = {
  default: {
    height: 200,
    width: 260,
  },
  favorite: {
    height: 110,
    width: 150,
  }
};

const OfferCard = ({ className, classNameWrapper, offer, onActiveCardId, sizeType }: OfferCardProps): JSX.Element => {
  const { previewImage, isPremium, price, title, type, rating, id} = offer;
  const size = sizes[sizeType];

  return (
    <article className={cn('place-card', className)}>
      {
        isPremium &&
        <CardMark />
      }
      <div className={cn('place-card__image-wrapper', classNameWrapper)}>
        <Link to={generatePath(AppRoute.Offer, { id: `${id}`})}
          onMouseOver={() => onActiveCardId?.(id)}
          onMouseLeave={() => onActiveCardId?.(null)}
        >
          <img className="place-card__image"
            src={previewImage}
            width={size.width}
            height={size.height}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offer={offer} className="place-card__bookmark-icon" />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingWidth(rating, MAX_RATING)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: `${id}`})}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
};

export default OfferCard;
