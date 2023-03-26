import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus, logoutAction } from '../../store/slices/user-slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const UserNav = () => {
  const dispatch = useAppDispatch();
  const { authorizationStatus, login, avatar } = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorite}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {
                isAuth &&
                <img src={avatar} alt="" />
              }
            </div>
            {
              isAuth &&
              <>
                <span className="header__user-name user__name">{login}</span>
                <span className="header__favorite-count">3</span>
              </>
            }
          </Link>
        </li>
        <li className="header__nav-item">
          {
            isAuth ?
              <Link
                className="header__nav-link"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logoutAction());
                }}
                to={'/'}
              >
                <span className="header__signout">Sign out</span>
              </Link> :
              <Link
                className="header__nav-link"
                to={AppRoute.Login}
              >
                <span className="header__signout">Sign in</span>
              </Link>
          }
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
