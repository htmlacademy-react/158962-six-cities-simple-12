import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFavoriteOffer } from '../../store/slices/favorites-slice/favorites-slice';
import { Offer } from '../../types/offer';
import { getIsAuth } from '../../store/slices/user-slice/user-slice';
import {useNavigate} from 'react-router-dom';
import { AppRoute } from '../../const';

type BookmarkButtonProps = {
  offer: Offer;
  isBig?: boolean;
  className: string;
}

const BookmarkButton = ({ offer, isBig, className }: BookmarkButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);

  const handleButtonClick = () => {
    dispatch(addFavoriteOffer(offer));
  };

  return (
    <button className={cn('button', {
      'property__bookmark-button': isBig,
      'property__bookmark-button--active': isBig && offer.isFavorite,
      'place-card__bookmark-button': !isBig,
      'place-card__bookmark-button--active': !isBig && offer.isFavorite
    })}
    onClick={() => {
      handleButtonClick();
      !isAuth && navigate(AppRoute.Login);
    }}
    type="button"
    >
      <svg
        className={className}
        width={isBig ? '31' : '18'}
        height={isBig ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
};

export default BookmarkButton;
