import {PropsWithChildren} from 'react';
import {dispatch} from '../../store';
import AuthStatus from '../../const/auth-status';
import {Link} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import {logoutAction} from '../../store/api-actions';
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

  const onSignOut = () => {
    dispatch(logoutAction())
      .then(() => window.location.reload());
  };

  return (
    <header className={`page-header ${props.headerClass }`}>
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {props.children}

      {
        props.showAvatar &&
          <ul className="user-block">
            {
              status === AuthStatus.Auth && (
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
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
