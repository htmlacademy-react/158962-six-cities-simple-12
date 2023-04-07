import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectFavoriteStatus, selectFavoritesItems, fetchFavorites, addFavoriteOffer } from '../../store/slices/favorites-slice';
import {Offer} from '../../types/offer';

type BookmarkButtonProps = {
  isFavorite: boolean;
  id: number;
  offer: Offer;
}

const BookmarkButton = ({ offer }: BookmarkButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(addFavoriteOffer(offer))
  }

  console.log('isFavorite from component', offer.isFavorite, offer.title)

  return (
    <button className={cn('place-card__bookmark-button button', offer.isFavorite && 'place-card__bookmark-button--active')}
            onClick={handleButtonClick}
            type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  )
};

export default BookmarkButton;
