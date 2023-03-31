import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';
import {AppRoute} from '../../const';
import { Offer } from '../../types/Offer';
import { getAuthorizationStatus} from '../../store/slices/user-slice';
import {useAppSelector} from '../../hooks';

type AppProps = {
  offers: Offer[];
}

const App = ({ offers }: AppProps): JSX.Element => {
  const { authorizationStatus } = useAppSelector(getAuthorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Offer} element={
          <Room />
        }
        />
        <Route path={AppRoute.Favorite} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <Favorites offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
