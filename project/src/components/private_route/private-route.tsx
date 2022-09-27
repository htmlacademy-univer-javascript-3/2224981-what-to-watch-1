import AuthStatus from '../../const/auth-status';
import {Navigate} from 'react-router-dom';


type PrivateRouteProps = {
  status: AuthStatus;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return props.status === AuthStatus.AUTH
    ? props.children
    : <Navigate to={'/login'}/>;
}

export default PrivateRoute;
