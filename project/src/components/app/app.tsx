import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';
import {AppRoute} from '../../const';
import {checkAuthAction, selectAuthorizationStatus} from '../../store/slices/user-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, Suspense} from 'react';
import Spinner from '../spinner/spinner';

const App = (): JSX.Element => {
  //const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect( () => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path={AppRoute.Root} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Offer} element={<Room />} />
        {/*<Route path={AppRoute.Favorite} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites offers={offers} />
            </PrivateRoute>} />*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>

  );
};

export default App;
