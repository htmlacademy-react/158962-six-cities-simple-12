import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { selectFavoriteOffers } from '../../store/slices/favorites-slice/favorites-slice';
import {
  logoutAction,
  selectAvatar,
  selectLogin,
  getIsAuth
} from '../../store/slices/user-slice/user-slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const UserNav = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector(selectLogin);
  const avatar = useAppSelector(selectAvatar);
  const isAuth = useAppSelector(getIsAuth);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const favoriteOffersAmount = favoriteOffers.length;

  //console.log('favoriteOffers:', favoriteOffers)

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorite}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {isAuth && <img src={avatar} alt="" />}
            </div>
            {isAuth &&
              <>
                <span className="header__user-name user__name">{login}</span>
                <span className="header__favorite-count">{favoriteOffersAmount}</span>
              </>}
          </Link>
        </li>
        <li className="header__nav-item">
          {isAuth ?
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              to={AppRoute.Root}
            >
              <span className="header__signout">Sign out</span>
            </Link> :
            <Link
              className="header__nav-link"
              to={AppRoute.Login}
            >
              <span className="header__signout">Sign in</span>
            </Link>}
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
