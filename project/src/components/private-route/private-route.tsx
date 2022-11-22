import AuthStatus from '../../const/auth-status';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/store-hooks';


type PrivateRouteProps = {
  requiredStatus: AuthStatus;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const status = useAppSelector((state) => state.userSlice.auth);

  return status === props.requiredStatus
    ? props.children
    : <Navigate to={'/login'}/>;
}

export default PrivateRoute;
