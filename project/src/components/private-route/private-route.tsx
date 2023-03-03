import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
};

const PrivateRoute = ({ authorizationStatus, children }: PrivateRouteProps): JSX.Element => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />
);

export default PrivateRoute;
