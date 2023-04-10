import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFavoriteOffer } from '../../store/slices/favorites-slice';
import { Offer } from '../../types/offer';
import { getIsAuth } from '../../store/slices/user-slice';
import {useNavigate} from 'react-router-dom';
import { AppRoute } from '../../const';

type BookmarkButtonProps = {
  offer: Offer;
}

const BookmarkButton = ({ offer }: BookmarkButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);

  const handleButtonClick = () => {
    dispatch(addFavoriteOffer(offer));
  };

  return (
    <button className={cn('place-card__bookmark-button button', offer.isFavorite && 'place-card__bookmark-button--active')}
      onClick={() => {
        handleButtonClick();
        !isAuth && navigate(AppRoute.Login);
      }}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
};

export default BookmarkButton;
