import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';
import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = {
  rentAmount: number;
}

const App = ({rentAmount}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Root} element={<Main rentAmount={rentAmount} />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={AppRoute.Room} element={<Room />} />
      <Route path={AppRoute.Favorite} element={
        <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
          <Favorites />
        </PrivateRoute>
      }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
