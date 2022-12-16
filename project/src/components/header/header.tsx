import {PropsWithChildren} from 'react';
import {dispatch} from '../../store';
import AuthStatus from '../../const/auth-status';
import {Link, useNavigate} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import {logoutAction} from '../../store/api-actions/api-actions';
import {useAppSelector} from '../../hooks/store-hooks';

export enum HeaderClass {
  FilmCard = 'film-card__head',
  UserPage = 'user-page__head',
  Empty = ''
}

type HeaderProps = {
  showAvatar?: boolean,
  headerClass: HeaderClass
} & PropsWithChildren;

function Header(props: HeaderProps) {
  const status = useAppSelector((state) => state.userSlice.auth);
  const user = useAppSelector((state) => state.userSlice.user);

  const navigate = useNavigate();

  const onSignOut = () => {
    dispatch(logoutAction())
      .then(() => navigate(0));
  };

  return (
    <header className={`page-header ${props.headerClass }`}>
      <div className="logo">
        <Link className="logo__link" to={'/'}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {props.children}

      {
        props.showAvatar &&
          <ul className="user-block">
            {
              status === AuthStatus.Auth && (
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <Link to={`/${AppRoutes.MyList}`}>
                      <img src={user?.avatarUrl || ''} alt="User avatar" width="63" height="63"/>
                    </Link>
                  </div>
                </li>
              )
            }
            <li className="user-block__item">
              {
                status === AuthStatus.Auth
                  ? <a onClick={onSignOut} className="user-block__link">Sign out</a>
                  : <Link to={`/${AppRoutes.Login}`} className="user-block__link">Sign in</Link>
              }
            </li>
          </ul>
      }
    </header>
  );
}

export default Header;
