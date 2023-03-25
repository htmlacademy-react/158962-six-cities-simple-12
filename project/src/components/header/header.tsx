import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction, getAuthorizationStatus } from '../../store/slices/user-slice';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { authorizationStatus, login } = useAppSelector(getAuthorizationStatus)

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type='header' />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorite}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {
                    authorizationStatus === AuthorizationStatus.Auth &&
                    <>
                      <span className="header__user-name user__name">{login}</span>
                      <span className="header__favorite-count">3</span>
                    </>
                  }
                </Link>
              </li>
              <li className="header__nav-item">
                {
                  authorizationStatus === AuthorizationStatus.Auth ?
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
        </div>
      </div>
    </header>
  )
};

export default Header;
