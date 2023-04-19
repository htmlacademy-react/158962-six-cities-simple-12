import {Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {checkAuthAction, selectAuthorizationStatus} from '../../store/slices/user-slice/user-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, Suspense, lazy} from 'react';
import Spinner from '../spinner/spinner';

const Favorites = lazy(() => import('../../pages/favorites/favorites'));
const Login = lazy(() => import('../../pages/login/login'));
const Room = lazy(() => import('../../pages/room/room'));
const NotFound = lazy(() => import('../../pages/not-found/not-found'));

const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const isLoading = authorizationStatus === AuthorizationStatus.Unknown;

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={AppRoute.Root} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Offer} element={<Room />} />
        {<Route path={AppRoute.Favorite} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <Favorites />
          </PrivateRoute>
        }/>}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>

  );
};

export default App;
