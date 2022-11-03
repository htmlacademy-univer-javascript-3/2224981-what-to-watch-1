import {PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../types/app-state';
import AuthStatus from '../../const/auth-status';
import {Link} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';

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
  const status = useSelector((state: AppState) => state.auth);

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
                  ? <a className="user-block__link">Sign out</a>
                  : <Link to={AppRoutes.Root + AppRoutes.Login} className="user-block__link">Sign in</Link>
              }
            </li>
          </ul>
      }
    </header>
  );
}

export default Header;
